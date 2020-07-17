import _ from "lodash";
import { findStartNodes, getCenter } from "../Util";
import { length, subtract, scalarMultiply, add, distance, unit} from "../Vector";

/* 
Implementation of force directed layout of graphs.
Adapted from:
Fruchterman, T.M. and Reingold, E.M., 1991. 
Graph drawing by force‐directed placement. 
Software: Practice and experience, 21(11), 
pp.1129-1164.
*/

const defaults = {
  bounds: {
    x: 0,
    y: 0,
    width: 2000,
    height: 2000
  },
  maxVelocity: 10,
  coolingFactor: 0.99
};

export default (graph, layout, customOptions) => {
  let options = _.defaultsDeep(customOptions, defaults);
  let random = () => Math.random();
  
  /* Calculate the repulsive force between nodes, based on 
  Fruchterman & Reingold 1991 */
  const repulse = (node, other, l) => {
    let d = distance(node, other);
    if (d) {
      return scalarMultiply(unit(subtract(node, other)), (l * l) / d);
    } else {
      return { x: 0, y: 0 };
    }
  };

  /* Calculate the attractive force between nodes, based on 
  Fruchterman & Reingold 1991 */
  const attract = (node, other, l) => {
    let d = distance(node, other);
    if (l > 0) {
      return scalarMultiply(unit(subtract(other, node)), (d * d) / l);
    } else {
      return { x: 0, y: 0 };
    }
  };

  /* Find all nodes that do not have a parent */
  let startNodes = findStartNodes(graph);

  /* Initialize the layout on first run */
  layout = _.cloneDeep(layout);
  if (!layout) {
    layout = {};
  }
  /* Find removed nodes */
  let removed = _.difference(_.keys(layout), _.keys(graph));
  /* Find newly added nodes */
  let added = _.difference(_.keys(graph), _.keys(layout));
  _.each(removed, (key) => _.unset(layout, key));
  _.each(added, (key) => {
    layout[key] = { x: random() * options.bounds.width, y: random() * options.bounds.height };
  });

  /*
  Initialize velocities
  */
  let velocities = _.reduce(
    graph,
    (acc, element, key) => {
      acc[key] = { x: 0, y: 0 };
      return acc;
    },
    {}
  );

  /*
  Calculate velocities of nodes
  */
  _.each(graph, (node, key) => {
    _.each(graph, (otherNode, otherKey) => {
      if (key === otherKey) return; // Node is self, skip
      let isChild = _.includes(node.parents, otherKey);
      let isParent = _.includes(node.children, otherKey);
      let center = add(layout[key], getCenter(node));
      let otherCenter = add(layout[otherKey], getCenter(otherNode));
      
      if (isParent || isChild) {
        velocities[key] = add(
          velocities[key],
          attract(center, otherCenter, node.graphics.bounds.width)
        );
        velocities[otherKey] = add(
          velocities[otherKey],
          attract(otherCenter, center, otherNode.graphics.bounds.width)
        );
      }

      velocities[key] = add(
        velocities[key],
        repulse(center, otherCenter, node.graphics.bounds.width)
      );
    });
  });
  layout = _.reduce(
    layout,
    (acc, value, key) => {
      let position = add(
        value,
        scalarMultiply(
          unit(velocities[key]),
          Math.min(length(velocities[key]), options.maxVelocity)
        )
      ); 
      position.x = Math.min(options.bounds.width, Math.max(options.bounds.x, position.x));
      position.y = Math.min(options.bounds.height, Math.max(options.bounds.y, position.y));
      if(!_.includes(startNodes, key)){
        acc[key] = position;
      } else {
        acc[key] = value;
      }
      return acc;
    },
    {}
  );
  return layout;
};
