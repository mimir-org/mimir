import { Dispatch } from "redux";
import { ObjectType } from "../../models";
import { GetLibraryType } from "../helpers";
import { fetchingType, changeTypeEditorVisibility } from "../redux/typeEditorSlice";

export const OnOpenTypeEditor = (
  selectedElement: string,
  selectedElementType: ObjectType,
  onChange: () => void,
  dispatch: Dispatch
) => {
  if (selectedElement && selectedElementType !== ObjectType.NotSet) {
    const filter = GetLibraryType(selectedElementType);
    dispatch(fetchingType({selectedType: selectedElement, filter}));
    onChange();
  } else {
    dispatch(changeTypeEditorVisibility(true));
    onChange();
  }
};
