import _ from 'lodash';
import { findStartNodes } from '../Util';

export default graph => {
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

  /*
  _.reduce(_.invertBy(columns), (result, value, key) => {
    _.reduce(value, (result, value) => {
        graph
    }, 0);
  }, {});
  */
  return _.reduce(graph, (result, value, key) => {
    let bounds = value.graphics.bounds;
    result[key] = {
      x: columns[key] * bounds.width,
      y: rows[key] * bounds.height
    };
    return result;
  }, {});
};