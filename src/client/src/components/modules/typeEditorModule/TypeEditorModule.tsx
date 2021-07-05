import "./typeeditor.scss";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { changeMode } from "../../../redux/store/typeEditor/actions";
import { NewTypeIcon, EditTypeIcon } from "../../../assets/icons/common";
import { TextResources } from "../../../assets/textResources";
import { VIEW_TYPE } from "../../../models/project";
import { TypeEditorBox, TypeEditorBoxContent } from "../../../compLibrary/box";
import { Mode } from "../../../models";

export const TypeEditorModule = ({ selectedElement }) => {
  const dispatch = useDispatch();
  const { push } = useHistory();

  const handleClick = (mode) => {
    if ((selectedElement && mode === Mode.Edit) || mode === Mode.New) {
      dispatch(changeMode(mode));
      push(`/home/${VIEW_TYPE.TYPE_EDITOR}`);
    }
  };

  return (
    <TypeEditorBox>
      <TypeEditorBoxContent active={true}>
        <div onClick={() => handleClick(Mode.New)} className="typeeditor_box">
          <img src={NewTypeIcon} alt="new-type" />
          <p>{TextResources.TypeEditor_New_Type}</p>
        </div>
      </TypeEditorBoxContent>
      <TypeEditorBoxContent active={selectedElement !== ""}>
        <div
          onClick={() => {
            if (selectedElement !== "") {
              handleClick(Mode.Edit);
            }
          }}
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
