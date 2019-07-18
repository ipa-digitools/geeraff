import _ from 'lodash';

export let getTransformedPosition = (position, svg) => {
  let point = svg.createSVGPoint();
  point.x = position.x;
  point.y = position.y;
  return point.matrixTransform(svg.getScreenCTM().inverse());
};

export let findStartNodes = graph => {
  return _.difference(_.keys(graph), _.flatMap(graph, node => node.children));
};