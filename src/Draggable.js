import React, { useRef, useState, useContext, useEffect } from "react";
import { getTransformedPosition } from "./Util";
import { DragContext } from "./DragContext";

export default (props) => {
  const initialPosition = {
    x: props.x || 0,
    y: props.y || 0,
  };

  const [position, setPosition] = useState(initialPosition);

  useEffect(() => setPosition({ x: props.x, y: props.y }));

  const container = useRef();
  const context = useContext(DragContext);

  let mousePosition;

  const mouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);
    container.current.style.pointerEvents = "none";
    props.dragged && props.dragged(initialPosition);
    context.setDragData(props.data);
  };

  let mouseUp = (event) => {
    event.preventDefault();
    event.stopPropagation();
    document.removeEventListener("mouseup", mouseUp);
    document.removeEventListener("mousemove", mouseMove);
    container.current.style.pointerEvents = "initial";
    props.dropped && props.dropped(position);
    context.setDropped(true);
    if (!props.persist) {
      setPosition(initialPosition);
    }
  };

  const mouseMove = (event) => {
    event.preventDefault();
    event.stopPropagation();
    let grid = props.grid;
    if(!grid) {
      grid = {x: 1, y: 1};
    }
    if (!mousePosition) {
      mousePosition = { x: event.clientX, y: event.clientY };
    }
    if (props.draggable) {
      const svg = container.current.viewportElement;
      let oldPosition = getTransformedPosition(mousePosition, svg);
      let currentPosition = getTransformedPosition(
        { x: event.clientX, y: event.clientY },
        svg
      );
      let offset = {
        x: currentPosition.x - oldPosition.x,
        y: currentPosition.y - oldPosition.y,
      };
      let newPosition = {
        x: Math.floor((initialPosition.x + offset.x) / grid.x) * grid.x,
        y: Math.floor((initialPosition.y + offset.y) / grid.y) * grid.y,
      };

      props.moved && props.moved(newPosition, offset);
      setPosition(newPosition);
    }
  };

  return (
    <g
      transform={`translate(${position.x}, ${position.y})`}
      onMouseDown={mouseDown}
      ref={container}
    >
      {props.children}
    </g>
  );
};
