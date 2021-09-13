import { TextResources } from "../../../../assets/text";
import { TypeEditorState } from "../../../../redux/store/typeEditor/types";

const GetAspects = (state: TypeEditorState) => {
  let filteredAspects = Object.entries(state.aspects);

  return filteredAspects.filter(
    ([, value]) =>
      value === TextResources.Aspect_Function ||
      value === TextResources.Aspect_Location
  );
};

export default GetAspects;
