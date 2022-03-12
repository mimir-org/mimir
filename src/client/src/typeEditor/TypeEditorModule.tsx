import { ObjectType } from "../models";
import { EditTypeIcon, NewTypeIcon } from "../assets/icons/type";
import { useAppDispatch } from "../redux/store";
import { OnOpenTypeEditor } from "./handlers";
import { TypeEditorBox, TypeEditorButton } from "./styled";
import { TypeEditorTextResources } from "./assets/TypeEditorTextResources";

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
      <TypeEditorButton
        disabled={false}
        onClick={() => OnOpenTypeEditor(selectedElement, selectedElementType, onChange, dispatch)}
      >
        <img src={NewTypeIcon} alt="new type" />
        {TypeEditorTextResources.NEW_TYPE}
      </TypeEditorButton>
      <TypeEditorButton
        disabled={selectedElement === ""}
        onClick={() => OnOpenTypeEditor(selectedElement, selectedElementType, onChange, dispatch)}
      >
        <img src={EditTypeIcon} alt="edit type" />
        {TypeEditorTextResources.EDIT_TYPE}
      </TypeEditorButton>
    </TypeEditorBox>
  );
};

export default TypeEditorModule;
