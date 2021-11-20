import React from "react";
import { DATA_TRANSFER_APPDATA_TYPE } from "../hooks/useOnDrop";

const IsSubProject = (event: React.DragEvent<HTMLDivElement>) => {
  const data = JSON.parse(event.dataTransfer.getData(DATA_TRANSFER_APPDATA_TYPE));
  return !data.hasOwnProperty("aspect");
};

export default IsSubProject;