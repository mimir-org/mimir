import { MODULE_TYPE } from "../../../../models/project";

const IsLibraryModule = (module: string) => {
  return module === MODULE_TYPE.LIBRARY;
};

export default IsLibraryModule;
