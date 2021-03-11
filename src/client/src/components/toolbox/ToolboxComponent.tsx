// import { useState } from "react";
import { NodeTypeOverview } from "..";

const ToolboxComponent = () => {
  // useState(() => {
  //   console.log("this will run the first time the component renders!");
  // });

  return (
    <div className="toolbox">
      <NodeTypeOverview />
    </div>
  );
};

export default ToolboxComponent;
