import React, { useState } from "react";
import _ from "lodash";
import Connector from "./Connector";
import Draggable from "./Draggable";
import longestPathLayout from "./Layouts/LongestPath";
import DragContext from "./DragContext";
import DropTarget from "./DropTarget";
//import { findStartNodes } from './Util';

/*
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
*/

/*
let layout = (graph, topology) => {
  return _.map(topology, (element, index) => {
    return (
      <g transform={`translate(${index * 150 + index * 10}, 20)`}>
        {graph[element].render()}
      </g>
    );
  });
};
*/

/*
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
*/

const renderConnections = (graph, layout) => {
  return _.flatMap(
    _.filter(
      _.keys(graph),
      key => graph[key].children && graph[key].children.length
    ),
    key => {
      return _.map(graph[key].children, childKey => {
        return (
          <g key={`${key}-${childKey}-connector`}>
            {graph[key].graphics.connector(
              {
                x: layout[key].x + graph[key].graphics.outputs.x,
                y: layout[key].y + graph[key].graphics.outputs.y,
                data: graph[key]
              },
              {
                x: layout[childKey].x + graph[key].graphics.inputs.x,
                y: layout[childKey].y + graph[key].graphics.inputs.y,
                data: graph[childKey]
              },
              graph
            )}
          </g>
        );
      });
    }
  );
};

const render = (graph, layout, setLayout) => {
  return _.map(graph, (node, key) => {
    return (
      <DropTarget key={key} data={node}>
        <Draggable
          moved={position => {
            let newLayout = _.cloneDeep(layout);
            newLayout[key] = position;
            setLayout(newLayout);
          }}
          x={layout[key].x}
          y={layout[key].y}
          persist={true}
          data={node}
        >
          {node.graphics.render()}
        </Draggable>
      </DropTarget>
    );
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
            data: node,
            type: nodeType.type,
            key: key,
            graphics: nodeType.graphics(node),
            drop: (dragData, dropData) =>
              nodeType.drop && nodeType.drop(dragData, dropData)
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

  //console.debug(findLongestPath(nodes, findStartNodes(nodes)));
  const [layout, setLayout] = useState(longestPathLayout(nodes));
  //console.debug(findStartNodes(nodes));
  // {layout(nodes, topology)}
  return (
    <svg width="1000px" height="1000px">
      <DragContext>
        {renderConnections(nodes, layout)}
        {render(nodes, layout, setLayout)}
      </DragContext>
    </svg>
  );
};
