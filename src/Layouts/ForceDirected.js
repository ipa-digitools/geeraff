import _ from "lodash";

export default (graph, layout) => {
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

  if (!layout) {
    layout = _.reduce(
      graph,
      (acc, element, key) => {
        acc[key] = { x: random(), y: random() };
        return acc;
      },
      {}
    );
  }
  let velocities = _.reduce(
    graph,
    (acc, element, key) => {
      acc[key] = { x: 0, y: 0 };
      return acc;
    },
    {}
  );
  for (let i = 0; i < 5; i++) {
    _.each(graph, (node, key) => {
      _.each(graph, (otherNode, otherKey) => {
        if (key === otherKey) return;
        let nodePosition = layout[key];
        let otherNodePosition = layout[otherKey];
        let isChild = _.includes(otherNode.children, key);
        if (isChild) {
          const dist = distance(nodePosition, otherNodePosition) * 0.1;
          const direction = unit(subtract(nodePosition, otherNodePosition));
          velocities[key] = scalarMultiply(direction, dist);
          velocities[otherKey] = scalarMultiply(invert(direction), dist);
        } else {
          const dist = distance(nodePosition, otherNodePosition) * 0.1;
          const direction = unit(subtract(otherNodePosition, nodePosition));
          velocities[key] = scalarMultiply(direction, dist);
          velocities[otherKey] = scalarMultiply(invert(direction), dist);
        }
      });
    });
    layout = _.reduce(
      layout,
      (acc, value, key) => {
        acc[key] = add(value, velocities[key]);
        return acc;
      },
      {}
    );
  }
  return layout;
};
