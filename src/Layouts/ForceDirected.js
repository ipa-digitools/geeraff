import _ from "lodash";

export default (graph, layout, setLayout) => {
  let random = () => Math.random() * 10;
  const invert = a => {
    return { x: -a.x, y: -a.y };
  };
  const length = a => Math.sqrt(a.x * a.x + a.y * a.y);
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
  const distance = (a, b) => length(subtract(a, b));
  const unit = a => {
    const l = length(a);
    if (l < 0.0001) {
      return { x: 0, y: 0 };
    }
    return { x: a.x / l, y: a.y / l };
  };

  layout = _.cloneDeep(layout);
  if (!layout) {
    layout = {};
  }
  let removed = _.difference(_.keys(layout), _.keys(graph));
  let added = _.difference(_.keys(graph), _.keys(layout));
  _.each(removed, key => _.unset(layout, key));
  _.each(added, key => {
    layout[key] = { x: random(), y: random() }
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
      let isChild = _.includes(node.children, otherKey);
      let inputPosition = add(layout[otherKey], otherNode.graphics.inputs);
      let outputPosition = add(layout[key], node.graphics.outputs);
      let offset = subtract(outputPosition, inputPosition);
      let distance = length(offset);
      if (distance < 0.01) distance = 0.01;
      let offsetDirection = unit(offset);
      let velocity = scalarMultiply(offsetDirection, 200 / distance);
      if (isChild) {
        velocities[otherKey] = add(velocities[otherKey], velocity);
        velocities[key] = subtract(velocity, velocities[key]);
      } else {
        velocities[otherKey] = add(velocities[otherKey], scalarMultiply(subtract({ x: 0, y: 0 }, velocity), 0.01));
        velocities[key] = add(velocities[key], scalarMultiply(subtract({ x: 0, y: 0 }, velocities[otherKey]), 0.01));
      }
    });
  });
  layout = _.reduce(
    layout,
    (acc, value, key) => {
      acc[key] = add(value, velocities[key]);
      velocities[key] = scalarMultiply(velocities[key], 0.1);
      return acc;
    },
    {}
  );
  return layout;
};
