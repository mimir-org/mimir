import { TypeMode } from "../../../../models";

const ModeNew = (mode: TypeMode) => {
  return mode === TypeMode.New;
};

export default ModeNew;
