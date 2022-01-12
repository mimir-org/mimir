export interface ModulesState {
  types: ModuleState[]
}

export interface ModuleState {
  type: string;
  visible: boolean;
  animate: boolean;
}

export interface ModulesVisibility {
  visible: boolean;
  animate: boolean;
}