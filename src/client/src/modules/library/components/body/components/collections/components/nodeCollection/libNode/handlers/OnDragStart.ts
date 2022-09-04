/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

const OnDragStart = (event: React.DragEvent<HTMLButtonElement>, node: any) => {
  event.dataTransfer.setData("application/reactflow", node);
  event.dataTransfer.effectAllowed = "move";
};

export default OnDragStart;
