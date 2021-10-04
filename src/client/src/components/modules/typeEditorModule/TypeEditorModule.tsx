import { useDispatch } from "react-redux";
import { ObjectType } from "../../../models";
import { TextResources } from "../../../assets/text";
import { NewTypeIcon, EditTypeIcon } from "../../../assets/icons/common";
import { TypeEditorBox, TypeEditorBoxContent } from "../../../compLibrary/box";
import {
  getSelectedNode,
  openTypeEditor,
} from "../../../redux/store/typeEditor/actions";
import { GetLibraryType } from "./helpers";
interface Props {
  selectedElement: string;
  selectedElementType: ObjectType;
  onChange: Function;
}
/**
 * Component for opening Type Editor window
 * @param param0
 * @returns buttons to add or edit a type in library module
 */
export const TypeEditorModule = ({
  selectedElement,
  selectedElementType,
  onChange,
}: Props) => {
  const dispatch = useDispatch();

  const onClick = () => {
    if (selectedElement && selectedElementType !== ObjectType.NotSet) {
      const filter = GetLibraryType(selectedElementType);
      dispatch(getSelectedNode(selectedElement, filter));
      onChange();
    } else {
      selectedElement = null;
      selectedElementType = ObjectType.NotSet;
      dispatch(openTypeEditor());
      onChange();
    }
  };

  return (
    <TypeEditorBox>
      <TypeEditorBoxContent active={true}>
        <div onClick={onClick} className="typeeditor_box">
          <img src={NewTypeIcon} alt="new-type" />
          <p>{TextResources.TypeEditor_New_Type}</p>
        </div>
      </TypeEditorBoxContent>
      <TypeEditorBoxContent active={selectedElement !== ""}>
        <div onClick={onClick} className="typeeditor_box">
          <img src={EditTypeIcon} alt="edit-type" />
          <p>{TextResources.TypeEditor_Edit_Type}</p>
        </div>
      </TypeEditorBoxContent>
    </TypeEditorBox>
  );
};

export default TypeEditorModule;
