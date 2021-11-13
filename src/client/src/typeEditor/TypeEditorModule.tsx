import { ObjectType } from "../models";
import { TextResources } from "../assets/text";
import { NewTypeIcon, EditTypeIcon } from "../assets/icons/type";
import { TypeEditorBox, TypeEditorBoxContent } from "../compLibrary/box/typeEditor";
import { useAppDispatch } from "../redux/store";
import { OnOpenTypeEditor } from "./handlers";

interface Props {
  selectedElement: string;
  selectedElementType: ObjectType;
  onChange: () => void;
}
/**
 * Component for opening Type Editor window
 * @param interface
 * @returns buttons to add or edit a type in library module
 */
export const TypeEditorModule = ({ selectedElement, selectedElementType, onChange }: Props) => {
  const dispatch = useAppDispatch();

  return (
    <TypeEditorBox>
      <TypeEditorBoxContent active={true}>
        <div
          onClick={() => OnOpenTypeEditor(selectedElement, selectedElementType, onChange, dispatch)}
          className="typeeditor_box"
        >
          <img src={NewTypeIcon} alt="new-type" />
          <p>{TextResources.TypeEditor_New_Type}</p>
        </div>
      </TypeEditorBoxContent>
      <TypeEditorBoxContent active={selectedElement !== ""}>
        <div
          onClick={() => OnOpenTypeEditor(selectedElement, selectedElementType, onChange, dispatch)}
          className="typeeditor_box"
        >
          <img src={EditTypeIcon} alt="edit-type" />
          <p>{TextResources.TypeEditor_Edit_Type}</p>
        </div>
      </TypeEditorBoxContent>
    </TypeEditorBox>
  );
};

export default TypeEditorModule;
