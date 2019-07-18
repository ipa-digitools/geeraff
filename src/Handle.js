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
      moved={(offset) => {setPosition({x: props.x-offset.x, y: props.y-offset.y})}}
      x={props.x}
      y={props.y}
      data={props.data}
    >
      {(() => {
        if (position) { 
          return <Connector startX={position.x} startY={position.y} endX={0} endY={0} style={{stroke: "green", strokeWidth: "3px"}}/>
        }
      })()}
      {props.children}
    </Draggable>
  );
};
