import { MODULE_TYPE } from "../../models/project";
import { createAppSelector } from "../../redux/store";

export const isOpenSelector = createAppSelector(
  (state) => state.modules.types,
  (types) => !!types.find((m) => m.visible)
);

export const isLibOpenSelector = createAppSelector(
  (state) => state.modules.types,
  (types) => types.find((m) => m.type === MODULE_TYPE.INSPECTOR).visible
);

export const isInspectorOpenSelector = createAppSelector(
  (state) => state.modules.types,
  (types) => types.find((m) => m.type === MODULE_TYPE.LIBRARY).visible
);

export const heightSelector = createAppSelector(
  (state) => state.inspectorHeight.height,
  (height) => height
);
