import { MODULE_TYPE } from "../models/project";

export const IsExplorer = (module: string) => {
  return module === MODULE_TYPE.EXPLORER;
};

export const IsLibrary = (module: string) => {
  return module === MODULE_TYPE.LIBRARY;
};

export const IsInspector = (module: string) => {
  return module === MODULE_TYPE.INSPECTOR;
};
