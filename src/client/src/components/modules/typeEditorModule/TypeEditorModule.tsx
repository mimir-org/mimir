import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store";
import { TypeEditorState } from "../../../redux/store/typeEditor/types";
import { useHistory } from "react-router-dom";
 import { changeMode } from "../../../redux/store/typeEditor/actions";
import { TypeEditorComponent } from "./TypeEditorComponent";
import { NewTypeIcon, EditTypeIcon } from "../../../assets/icons/common";
import { TextResources } from "../../../assets/textResources";
import { VIEW_TYPE } from "../../../models/project";
import { TypeEditorBox, TypeEditorBoxContent } from "../../../compLibrary/box";
import "./typeeditor.scss";

export const TypeEditorModule = ({selectedElement}) => {
  const dispatch = useDispatch();
  const { push } = useHistory();

  const state = useSelector<RootState>(
    (state) => state.typeEditor
  ) as TypeEditorState;

  const handleClick = (param) => {
    if(selectedElement){
      dispatch(changeMode(param));
      push(`/home/${VIEW_TYPE.TYPE_EDITOR}`);
    }
  };

  return (
    <>
        <TypeEditorBox>
          <TypeEditorBoxContent active={true}>
            <div onClick={() => handleClick("new")} className="typeeditor_box">
              <img src={NewTypeIcon} alt="new-type" />
              <p>{TextResources.TypeEditor_New_Type}</p>
            </div>
          </TypeEditorBoxContent>
          <TypeEditorBoxContent active={selectedElement !== ""}>
            <div onClick={() => {
                if(selectedElement !== "") {
                  handleClick("edit");
                }
              }} className="typeeditor_box">
              <img src={EditTypeIcon} alt="edit-type" />
              <p>{TextResources.TypeEditor_Edit_Type}</p>
            </div>
          </TypeEditorBoxContent>
        </TypeEditorBox>
    </>
  );
};

export default TypeEditorModule;
