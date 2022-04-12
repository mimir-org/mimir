import React from "react";
import { DATA_TRANSFER_APPDATA_TYPE } from "../hooks/useOnTreeDrop";

const IsSubProject = (event: React.DragEvent<HTMLDivElement>) => {
  const data = JSON.parse(event.dataTransfer.getData(DATA_TRANSFER_APPDATA_TYPE));
  return !Object.prototype.hasOwnProperty.call(data, "aspect");
};

export default IsSubProject;
