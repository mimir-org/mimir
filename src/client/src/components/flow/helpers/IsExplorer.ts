import { MODULE_TYPE } from "../../../models/project";

const IsExplorer = (module: string) => {
  return module === MODULE_TYPE.EXPLORER;
};

export default IsExplorer;
