import { ObjectType } from "../../models";
import { Dispatch } from "redux";
import { GetLibraryType } from "../helpers";
import { fetchCreateLibraryType } from "../redux/typeEditorSlice";

export const OnOpenTypeEditorWithItem = (
  selectedElement: string,
  selectedElementType: ObjectType,
  onChange: () => void,
  dispatch: Dispatch
) => {
  const filter = GetLibraryType(selectedElementType);
  dispatch(fetchCreateLibraryType({ selectedType: selectedElement, filter }));
  onChange();
};
