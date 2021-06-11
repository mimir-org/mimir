import { useState } from "react";
import { useHistory } from "react-router-dom";
import { TypeEditorComponent } from "./TypeEditorComponent";
import { NewTypeIcon, EditTypeIcon } from "../../../assets/icons/common";
import { TextResources } from "../../../assets/textResources";
import { useDispatch } from "react-redux";
import { VIEW_TYPE } from "../../../models/project";
import { changeFlowView } from "../../../redux/store/flow/actions";
import {
  TypeEditorBox,
  TypeEditorBoxContent,
} from "../../../componentLibrary/box";
import "./typeeditor.scss";

export const TypeEditorModule = () => {
  const dispatch = useDispatch();
  const { push } = useHistory();

  const [mode, setMode] = useState("");
  const handleClick = (param) => {
    setMode(param);
    dispatch(changeFlowView(VIEW_TYPE.TYPE_EDITOR));
    push(`/home/${VIEW_TYPE.TYPE_EDITOR}`);
  };

  return (
    <>
      <TypeEditorBox>
        <TypeEditorBoxContent>
          <div onClick={() => handleClick("new")} className="typeeditor_box">
            <img src={NewTypeIcon} alt="new-type" />
            <p>{TextResources.TypeEditor_New_Type}</p>
          </div>
        </TypeEditorBoxContent>
        <TypeEditorBoxContent>
          <div onClick={() => handleClick("edit")} className="typeeditor_box">
            <img src={EditTypeIcon} alt="edit-type" />
            <p>{TextResources.TypeEditor_Edit_Type}</p>
          </div>
        </TypeEditorBoxContent>
      </TypeEditorBox>
      {mode !== "" && <TypeEditorComponent mode={mode} />}
    </>
  );
};

export default TypeEditorModule;
