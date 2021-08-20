import "./typeeditor.scss";
import { useHistory } from "react-router-dom";
import { TypeMode } from "../../../models";
import { TextResources } from "../../../assets/text";
import { NewTypeIcon, EditTypeIcon } from "../../../assets/icons/common";
import { VIEW_TYPE } from "../../../models/project";
import { TypeEditorBox, TypeEditorBoxContent } from "../../../compLibrary/box";

interface Props {
  selectedElement: string;
}
export const TypeEditorModule = ({ selectedElement }: Props) => {
  const { push } = useHistory();

  const onClick = (mode: TypeMode) => {
    let modeUrl = mode === TypeMode.Edit ? "edit" : "new";
    push({
      pathname: `/home/${VIEW_TYPE.TYPE_EDITOR}/${modeUrl}`,
      state: {
        selectedType: selectedElement,
        mode: mode,
      },
    });
  };

  return (
    <TypeEditorBox>
      <TypeEditorBoxContent active={true}>
        <div onClick={() => onClick(TypeMode.New)} className="typeeditor_box">
          <img src={NewTypeIcon} alt="new-type" />
          <p>{TextResources.TypeEditor_New_Type}</p>
        </div>
      </TypeEditorBoxContent>
      <TypeEditorBoxContent active={selectedElement !== ""}>
        <div
          onClick={selectedElement !== "" ? () => onClick(TypeMode.Edit) : null}
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
