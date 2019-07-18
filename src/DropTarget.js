import React, { useRef, useState, useContext } from "react";
import { DragContext } from "./DragContext";

export default props => {
  const context = useContext(DragContext);
  return (
    <g
      onMouseOver={() => {
        context.setDropData(props.data);
      }}
      onMouseOut={() => {
        context.setDropData(null);
      }}
    >
      {props.children}
    </g>
  );
};
