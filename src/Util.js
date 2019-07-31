import _ from "lodash";

export const getTransformedPosition = (position, svg) => {
  let point = svg.createSVGPoint();
  point.x = position.x;
  point.y = position.y;
  return point.matrixTransform(svg.getScreenCTM().inverse());
};

export const findStartNodes = graph => {
  return _.difference(_.keys(graph), _.flatMap(graph, node => node.children));
};

export const getViewBox = (x, y, width, height) => { 
  return `${x} ${y} ${width} ${height}`;
}

export function bounds(x, y, width, height){
    return {
        x: x,
        y: y,
        width: width,
        height: height
    }
}

const generateChildren = (index, count, parentId) => {
  let l = [];
  const maxIndex = index + 1 + count;
  for (let i = index + 1; i < maxIndex; i++) {
    l.push(parentId + "-" + i);
  }
  return l;
};

export const flatten = (data, childAccessor, index, parentId) => {
  if (!parentId) { 
    parentId = "";
  }
  if (!index) {
    index = 0;
  }
  if (!data) {
    return [];
  } else { 
    data.id = parentId ? parentId + "-" + index : "" + index;
    data.connections = data.children ? generateChildren(index, data.children.length, data.id) : [];
    return _.concat(data, _.flatMap(childAccessor(data), (child, key) =>flatten(child, childAccessor, index+1+key, data.id)));
  }
};
