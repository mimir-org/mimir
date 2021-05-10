import {
  TypeEditorBox,
  TypeEditorBoxContent,
} from "../../../componentLibrary/box";
import { NewTypeIcon, EditTypeIcon } from "../../../assets/icons";
import { TextResources } from "../../../assets/textResources";

export const TypeEditorModule = () => {
  return (
    <>
      <TypeEditorBox>
        <TypeEditorBoxContent>
          <img src={NewTypeIcon} alt="new-type" />
          <p>{TextResources.TypeEditor_New_Type}</p>
        </TypeEditorBoxContent>
        <TypeEditorBoxContent>
          <img src={EditTypeIcon} alt="edit-type" />
          <p>{TextResources.TypeEditor_Edit_Type}</p>
        </TypeEditorBoxContent>
      </TypeEditorBox>
    </>
  );
};

export default TypeEditorModule;
