import { TypeEditorState } from "../../../../redux/store/typeEditor/types";

const GetStatus = (state: TypeEditorState) => {
  return Object.entries(state.statuses).filter(
    ([, value]) =>
      value === "Draft" || value === "Complete" || value === "Approved"
  );
};

export default GetStatus;
