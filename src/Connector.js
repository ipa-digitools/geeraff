import React from "react";
import _ from "lodash";

export default props => {
  console.debug("Rendering connector", props);
  return <path d={`M${props.startX} ${props.startY} 
  C ${props.startX+200} ${props.startY}, ${props.endX-200} ${props.endY}, 
  ${props.endX} ${props.endY}`} stroke="black" fill="transparent"/>
};