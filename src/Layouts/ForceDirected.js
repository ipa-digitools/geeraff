import _ from "lodash";
import { findStartNodes, getCenter } from "../Util";

export default (graph, layout, setLayout) => {
  let random = () => Math.random();
  const invert = (a) => {
    return { x: -a.x, y: -a.y };
  };
  const length = (a) => Math.sqrt(a.x * a.x + a.y * a.y);
  const subtract = (a, b) => {
    return { x: a.x - b.x, y: a.y - b.y };
  };
  const multiply = (a, b) => {
    return { x: a.x * b.x, y: a.y * b.y };
  };
  const add = (a, b) => {
    return { x: a.x + b.x, y: a.y + b.y };
  };
  const scalarMultiply = (a, s) => {
    return { x: a.x * s, y: a.y * s };
  };
  const scalarDivide = (a, s) => {
    return { x: a.x / s, y: a.y / s };
  };
  const distance = (a, b) => length(subtract(a, b));
  const unit = (a) => {
    const l = length(a);
    if (l < 0.0001) {
      return { x: 0, y: 0 };
    }
    return { x: a.x / l, y: a.y / l };
  };
  const repulse = (node, other, c, l) => {
    let d = distance(node, other);
    if (d) {
      //return multiply(unit(subtract(node, other)), scalarMultiply(scalarDivide(c, Math.pow(d, 2)), l));
      return scalarMultiply(unit(subtract(node, other)), (l * l) / d);
    } else {
      return { x: 0, y: 0 };
    }
  };
  const attract = (node, other, c, l) => {
    let d = distance(node, other);
    if (l > 0) {
      //return multiply(unit(subtract(other, node)), scalarMultiply(c, Math.log10(d / l)));
      return scalarMultiply(unit(subtract(other, node)), (d * d) / l);
    } else {
      return { x: 0, y: 0 };
    }
  };
  let startNodes = findStartNodes(graph);
  layout = _.cloneDeep(layout);
  if (!layout) {
    layout = {};
  }
  let removed = _.difference(_.keys(layout), _.keys(graph));
  let added = _.difference(_.keys(graph), _.keys(layout));
  _.each(removed, (key) => _.unset(layout, key));
  let parentCount = 0;
  _.each(added, (key) => {
    /*
    let hasParents = graph[key].parents; 
    if(hasParents){
      layout[key] = { x: Math.abs(random() * 200), y: Math.abs(random() * 200)}
    } else {
      layout[key] = {x: 0, y: parentCount * 200};
      parentCount++;
    }
    */
    layout[key] = { x: random() * 800, y: random() * 800 };
  });

  let velocities = _.reduce(
    graph,
    (acc, element, key) => {
      acc[key] = { x: 0, y: 0 };
      return acc;
    },
    {}
  );

  _.each(graph, (node, key) => {
    _.each(graph, (otherNode, otherKey) => {
      if (key === otherKey) return; // Node is self, skip
      let isChild = _.includes(node.parents, otherKey);
      let isParent = _.includes(node.children, otherKey);
      let center = add(layout[key], getCenter(node));
      let otherCenter = add(layout[otherKey], getCenter(otherNode));
      /*
      let bias = {x: 500, y: 500};
      if (isParent) {
        bias = {x: 50, y: 50};
        velocities[key] = add(velocities[key], attract(add(layout[key], center), add(layout[otherKey], otherCenter), bias, 1));
      } else if(isChild) {
        velocities[key] = add(velocities[key], attract(add(layout[key], center), add(layout[otherKey], otherCenter), bias, 1));
      } else {
        velocities[key] = add(velocities[key], repulse(add(layout[key], center), add(layout[otherKey], otherCenter), bias, 1));
      }*/
      if (isParent || isChild) {
        velocities[key] = add(
          velocities[key],
          attract(center, otherCenter, 0, 200)
        );
        
        velocities[otherKey] = add(
          velocities[otherKey],
          attract(otherCenter, center, 0, 200)
        );
        /*
        velocities[otherKey] = add(
          velocities[otherKey],
          attract(otherCenter, center, 0, 200)
        );
        */
      }
      /*if (isChild) {
        velocities[key] = add(velocities[key], attract(add(layout[key], center), add(layout[otherKey], otherCenter), 0, 200));
      } */

      velocities[key] = add(
        velocities[key],
        repulse(center, otherCenter, 0, 200)
      );
      //velocities[key] = add(velocities[key], repulse(add(layout[otherKey], otherCenter), add(layout[key], center), 0, 200));
    });
  });
  layout = _.reduce(
    layout,
    (acc, value, key) => {
      /*
      if(!_.includes(startNodes, key)){
      acc[key] = add(value, velocities[key]);
      } else {
        acc[key] = value;
      }
      */
      //acc[key] = add(value, unit(velocities[key]));
      
      let position = add(
        value,
        //velocities[key]
        
        scalarMultiply(
          unit(velocities[key]),
          Math.min(length(velocities[key]), 10)
        )
      ); //add(value, velocities[key]);
      position.x = Math.min(4000, Math.max(0, position.x));
      position.y = Math.min(1000, Math.max(0, position.y));
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
