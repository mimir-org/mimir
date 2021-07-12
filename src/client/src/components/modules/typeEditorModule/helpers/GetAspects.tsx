import { TypeEditorState } from "../../../../redux/store/typeEditor/types";

const GetAspects = (state: TypeEditorState) => {
  let filteredAspects = Object.entries(state.aspects);

  return filteredAspects.filter(
    ([, value]) => value === "Function" || value === "Location"
  );
};

export default GetAspects;
