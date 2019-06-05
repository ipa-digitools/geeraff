import React from "react";
import _ from "lodash";
import Connector from "./Connector";

let findStartNodes = graph => {
  return _.difference(_.keys(graph), _.flatMap(graph, node => node.children));
};

let topologicalSort = graph => {
  let associations = _.reduce(
    graph,
    (result, value, key) => {
      result[key] = _.clone(value.children);
      return result;
    },
    {}
  );
  let sortedNodes = [];
  let startNodes = findStartNodes(graph);
  while (!_.isEmpty(startNodes)) {
    let node = startNodes.pop();
    sortedNodes.push(node);
    _.each(associations[node], child => {
      if (
        !_.reduce(
          _.without(_.keys(associations), node),
          (result, key) => _.has(associations[key], child) && result,
          true
        )
      ) {
        startNodes.push(child);
      }
    });
    associations[node] = [];
  }
  if (
    _.reduce(
      associations,
      (result, value) => {
        return result + value.length;
      },
      0
    )
  ) {
    console.debug("ERROR! Graph has cycles", associations, sortedNodes);
    return null;
  } else {
    return sortedNodes;
  }
};

let layout = (graph, topology) => {
  return _.map(topology, (element, index) => {
    return (
      <g transform={`translate(${index * 150 + index * 10}, 20)`}>
        {graph[element].render()}
      </g>
    );
  });
};

let findLongestPath = (graph, startNodes) => {
  if (_.isEmpty(startNodes)) return [];

  let paths = _.map(startNodes, startNode => {
    return _.concat(
      [startNode],
      findLongestPath(graph, graph[startNode].children)
    );
  });
  return _.reduce(paths, (result, path) =>
    result.length < path.length ? path : result
  );
};

let longestPathLayout = graph => {
  let startNodes = findStartNodes(graph);
  let longestPath = findLongestPath(graph, startNodes);
  /*
  let columns = _.reduce(
    longestPath,
    (result, key, index) => {
      result[key] = index;
      return result;
    },
    {}
  );
*/
  /*
  _.each(graph, (node, key) => {
    if(columns[key] === undefined){
      let column = _.reduce(node.children, (result, childKey) => {
        if(columns[childKey] !== undefined && columns[childKey] < result){
            return columns[childKey] - 1;
        }
        return result;
      }, _.keys(columns).length);
      columns[key] = column;
    }
  });
  console.debug(columns);
  */
  let _generateColumns = (layer, nodes, graph, result) => {
    if (_.isEmpty(nodes)) {
      return {layer: layer, changed: false};
    }
    return _.min(
      _.map(nodes, node => {
        let generated = _generateColumns(layer + 1, graph[node].children, graph, result);
        let column = generated.layer - 1;
        let changed = result[node] !== column;
        result[node] = column;
        return {layer: column, changed: generated.changed || changed}; 
      })
    );
  };

  let generateColumns = graph => {
    let result = {};
    let nodes = findStartNodes(graph);
    while(_generateColumns(0, nodes, graph, result).changed);
    return result;
  }

  let generateRows = columns => {
    let ocupation = {};
    return _.reduce(columns, (result, column, key) => {
      if(!_.has(ocupation, column)){
        ocupation[column] = 0;
      }
      result[key] = ocupation[column];
      ocupation[column] = ocupation[column] + 1;
      return result;
    }, {});
  }

  let columns = generateColumns(graph);
  let rows = generateRows(columns);

  return _.map(graph, (node, key) => {
    return <g transform={`translate(${columns[key]*100 + columns[key] * 10},${rows[key]*30 + rows[key] * 10})`}>
      {node.render()}
    </g>
  });
};

export default props => {
  let nodes = _.reduce(
    props.nodes,
    (result, nodeType) => {
      return _.reduce(
        props.data[nodeType.accessor],
        (result, node, index) => {
          let key = nodeType.key(node, index);
          result[key] = {
            render: () => nodeType.render(node)
          };
          return result;
        },
        result
      );
    },
    {}
  );
  _.each(props.nodes, nodeType => {
    return _.each(props.data[nodeType.accessor], (node, index) => {
      let key = nodeType.key(node, index);
      let children = _.compact(nodeType.children(node, index, props.data));
      nodes[key].children = children;
    });
  });

  console.debug(findStartNodes(nodes));
  let topology = topologicalSort(nodes);
  console.debug(topology);
  //console.debug(findLongestPath(nodes, findStartNodes(nodes)));
  console.debug(longestPathLayout(nodes));
  //console.debug(findStartNodes(nodes));
  // {layout(nodes, topology)}
  return (
    <svg width="1000px" height="1000px">
      {longestPathLayout(nodes)}
    </svg>
  );
};
