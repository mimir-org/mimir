export const CHANGE_MODULE_VISIBILITY = "CHANGE_MODULE_VISIBILITY";

export interface ChangeModuleVisibilty {
  type: typeof CHANGE_MODULE_VISIBILITY;
  payload: {
    key: string;
    visible: boolean;
    animate: boolean;
  };
}
