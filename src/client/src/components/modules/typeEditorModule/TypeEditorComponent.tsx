import { useState } from "react";
import {
  TypeEditorWrapper,
  TypeEditorContent,
  TypeEditorHeader,
} from "./styled";
import { TextResources } from "../../../assets/textResources";
import { CloseIcon } from "../../../assets/icons";

interface Props {
  mode: string;
}

export const TypeEditorComponent = ({ mode }: Props) => {
  const [visible, setVisible] = useState(true);
  const handleClick = () => {
    // console.log("clicked on x");
    setVisible(!visible);
  };
  return (
    <>
      {visible ? (
        <TypeEditorWrapper>
          <TypeEditorContent>
            <TypeEditorHeader>
              <p>{TextResources.TypeEditor}</p>
              <img src={CloseIcon} alt="close-window" onClick={handleClick} />
            </TypeEditorHeader>
            {/* <TypeInfo></TypeInfo> */}
            {/* <ChooseProperties>
          {mode === "new" ? <p>TE Component NEW</p> : <p>TE Component EDIT</p>}
          </ChooseProperties> */}
            {/* <TypeEditorInspector></TypeEditorInspector> */}
          </TypeEditorContent>
        </TypeEditorWrapper>
      ) : null}
    </>
  );
};

export default TypeEditorComponent;
