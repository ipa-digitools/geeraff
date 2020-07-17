export const invert = (a) => {
  return { x: -a.x, y: -a.y };
};
export const length = (a) => Math.sqrt(a.x * a.x + a.y * a.y);
export const subtract = (a, b) => {
  return { x: a.x - b.x, y: a.y - b.y };
};
export const multiply = (a, b) => {
  return { x: a.x * b.x, y: a.y * b.y };
};
export const add = (a, b) => {
  return { x: a.x + b.x, y: a.y + b.y };
};
export const scalarMultiply = (a, s) => {
  return { x: a.x * s, y: a.y * s };
};
export const scalarDivide = (a, s) => {
  return { x: a.x / s, y: a.y / s };
};
export const distance = (a, b) => length(subtract(a, b));
export const unit = (a) => {
  const l = length(a);
  if (l < 0.0001) {
    return { x: 0, y: 0 };
  }
  return { x: a.x / l, y: a.y / l };
};
