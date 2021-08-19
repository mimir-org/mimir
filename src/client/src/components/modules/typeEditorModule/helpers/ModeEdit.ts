import { TypeMode } from "../../../../models";

const ModeEdit = (mode: TypeMode) => {
  return mode === TypeMode.Edit;
};

export default ModeEdit;
