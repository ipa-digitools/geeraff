import _ from "lodash";
import { findStartNodes, findEndNodes } from "../Util";

export default graph => {
  const assignLayers = (node, layer, assignments) => {
    if (!assignments[node] || assignments[node] < layer) {
      assignments[node] = layer;
    }
  };
  const _generateLayers = (node, layer, assignments) => {
    assignLayers(node, layer, assignments);
    _.each(graph[node].children, child => {
      _generateLayers(child, layer + 1, assignments);
    });
  };
  const generateLayers = graph => {
    let nodes = findStartNodes(graph);
    const trees = _.map(nodes, node => {
      let assignments = {};
      _generateLayers(node, 0, assignments);
      return _.invertBy(assignments);
    });
    return trees;
  };
  const trees = generateLayers(graph);
  _.map(trees, tree => {
    let layout = {};
    let x = 0,
      y = 0;
    let widestLayer = _.reduce(
      tree,
      (acc, layer, key) => {
        if (tree[acc].length > layer.length) {
          return acc;
        } else {
          return key;
        }
      },
      0
    );
    let maxWidth = _.reduce(
      tree[widestLayer],
      (acc, node, key) => {
        return acc + graph[node].graphics.bounds.width;
      },
      0
    );
    _.each(tree, layer => {
      let layerWidth = _.reduce(
        layer,
        (acc, node, key) => {
          return acc + graph[node].graphics.bounds.width;
        },
        0
      );
      _.reduce(
        layer,
        (acc, node, key) => {
          const offset = acc + graph[node].graphics.bounds.width;
          layout[node] = { x: offset };
          return offset;
        },
        (maxWidth - layerWidth) / 2
      );
    });
     _.each(tree, layer => {
        let height = _.reduce(
           layer,
           (acc, node, key) => { 
              if (acc > graph[node].graphics.bounds.height) {
                 return acc;
              } else { 
                 return graph[node].graphics.bounds.height;
              }
           },
           0
        );
     });
  });

  const _generateColumns = (layer, nodes, graph, result) => {
    if (_.isEmpty(nodes)) {
      return { layer: layer, changed: false };
    }

    return _.min(
      _.map(nodes, node => {
        let generated = _generateColumns(
          layer + 1,
          graph[node].children,
          graph,
          result
        );
        let column = generated.layer - 1;
        let changed = result[node] !== column;
        result[node] = column;
        return { layer: column, changed: generated.changed || changed };
      })
    );
  };

  const generateColumns = graph => {
    let result = {};
    let nodes = findStartNodes(graph);
    while (_generateColumns(0, nodes, graph, result).changed);
    return result;
  };

  const generateRows = columns => {
    let ocupation = {};
    return _.reduce(
      columns,
      (result, column, key) => {
        if (!_.has(ocupation, column)) {
          ocupation[column] = 0;
        }
        result[key] = ocupation[column];
        ocupation[column] = ocupation[column] + 1;
        return result;
      },
      {}
    );
  };

  let columns = generateColumns(graph);
  let rows = generateRows(columns);

  /*
  _.reduce(_.invertBy(columns), (result, value, key) => {
    _.reduce(value, (result, value) => {
        graph
    }, 0);
  }, {});
  */
  /*
  let widths = _.reduce(
    graph,
    (result, value, key) => { 
      let bounds = value.graphics.bounds;
      if (!result[key]) {
        result[key] = bounds.width;
      } else { 
        if (result[key] < bounds.width) { 
          result[key] = bounds.width;
        }
      }
      return result;
    }
  )
  */
  let maxWidth = _.reduce(
    graph,
    (result, value) => {
      if (value.graphics.bounds.width > result) {
        return value.graphics.bounds.width;
      }
      return result;
    },
    0
  );
  let maxHeight = _.reduce(
    graph,
    (result, value) => {
      if (value.graphics.bounds.height > result) {
        return value.graphics.bounds.height;
      }
      return result;
    },
    0
  );
  return _.reduce(
    graph,
    (result, value, key) => {
      let bounds = value.graphics.bounds;
      result[key] = {
        x: columns[key] * maxWidth + (maxWidth - bounds.width) / 2,//* bounds.width,
        y: rows[key] * maxHeight + (maxHeight - bounds.height) / 2
      };
      return result;
    },
    {}
  );
};
