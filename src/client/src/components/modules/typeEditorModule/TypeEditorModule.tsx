import { useState } from "react";
import { TypeEditorComponent } from "./TypeEditorComponent";
import {
  TypeEditorBox,
  TypeEditorBoxContent,
} from "../../../componentLibrary/box";
import "./typeeditor.scss";
import { NewTypeIcon, EditTypeIcon } from "../../../assets/icons";
import { TextResources } from "../../../assets/textResources";

export const TypeEditorModule = () => {
  const [mode, setMode] = useState("");
  const handleClick = (param) => {
    setMode(param);
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
