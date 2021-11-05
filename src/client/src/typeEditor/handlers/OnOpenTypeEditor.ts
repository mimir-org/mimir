import { Dispatch } from "redux";
import { ObjectType } from "../../models";
import { GetLibraryType } from "../helpers";
import { getSelectedNode, openTypeEditor } from "../redux/actions";

export const OnOpenTypeEditor = (
  selectedElement: string,
  selectedElementType: ObjectType,
  onChange: () => void,
  dispatch: Dispatch
) => {
  if (selectedElement && selectedElementType !== ObjectType.NotSet) {
    const filter = GetLibraryType(selectedElementType);
    dispatch(getSelectedNode(selectedElement, filter));
    onChange();
  } else {
    dispatch(openTypeEditor());
    onChange();
  }
};
