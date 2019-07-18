import React, { useState, useRef } from "react";
import _ from "lodash";

export const DragContext = React.createContext();

export default props => {
  const [dragData, setDragData] = useState(null);

  const [dropData, setDropData] = useState(null);

  const [dropped, setDropped] = useState(false);

  if(dropped){
      dragData && dragData.drop && dragData.drop(dragData, dropData);
      dropData && dropData.drop && dropData.drop(dragData, dropData);
      props.dropped && props.dropped(dragData, dropData);
      setDropped(false);
  }

  return (
    <DragContext.Provider value={{setDropData, setDragData, setDropped}}>
      {props.children}
    </DragContext.Provider>
  );
};
