export interface User {
  id: number;
  username: string;
  name: string;
  settings: Map<string, string>;
}

export const SETTING_KEY = {
  PREFERED_TYPE: "PREFERED_TYPE",
};

export const SETTING_VALUE = {
  TREE_VIEW: "TREE_VIEW",
  DIAGRAM_VIEW: "DIAGRAM_VIEW",
};
