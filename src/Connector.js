import React, { useRef, useState } from "react";

export default props => {
  let path = null;
  let [position, setPosition] = useState(null);
  const length = Math.sqrt(Math.pow(props.startX - props.endX, 2) + Math.pow(props.startY - props.endY, 2));
  const straight = length / 2;

  let pathSet = path => {
    if (path) {
      let length = path.getTotalLength();
      let newPosition = path.getPointAtLength(length / 2);
      if (!position || (newPosition.x !== position.x || newPosition.y !== position.y)) {
        setPosition(newPosition);
      }
    }
  };

  return <g>
    <path d={`M${props.startX} ${props.startY} 
  C ${props.startX + straight} ${props.startY}, ${props.endX - straight} ${props.endY}, 
  ${props.endX} ${props.endY}`} fill="transparent" style={props.style} onClick={props.onClick} ref={pathSet} />
    {(() => {
      if (position) {
        return <g transform={`translate(${position.x}, ${position.y})`}>
          {props.children}
        </g>
      }
    })()}
  </g>
};