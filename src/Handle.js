import React, { useState } from "react";
import Draggable from "./Draggable";
import Connector from "./Connector";

export default props => {
  const [position, setPosition] = useState(null);
  return (
    <Draggable
      persist={false}
      dragged={pos => { setPosition({x: 0, y: 0});}}
      dropped={() => { setPosition(null);}}
      moved={(offset) => {setPosition({x: offset.x - props.x, y: offset.y-props.y})}}
      x={props.x}
      y={props.y}
      data={props.data}
    >
      {(() => {
        if (position) { 
          return <Connector startX={0} startY={0} endX={position.x} endY={position.y} style={{stroke: "green", strokeWidth: "3px"}}/>
        }
      })()}
      <g transform={position ? `translate(${position.x}, ${position.y})` : "translate(0,0)"}>
        {props.children}
      </g>
    </Draggable>
  );
};
