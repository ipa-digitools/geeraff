import React from "react";

export default props => {
  let length = Math.sqrt(Math.pow(props.startX - props.endX, 2) + Math.pow(props.startY - props.endY, 2));
  let straight = length / 2;
  return <path d={`M${props.startX} ${props.startY} 
  C ${props.startX + straight} ${props.startY}, ${props.endX - straight} ${props.endY}, 
  ${props.endX} ${props.endY}`} fill="transparent" style={props.style} onClick={props.onClick}/>
};