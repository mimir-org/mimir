import { MODULE_TYPE } from "../../../../models/project";

const IsExplorerModule = (module: string) => {
  return module === MODULE_TYPE.EXPLORER;
};

export default IsExplorerModule;
