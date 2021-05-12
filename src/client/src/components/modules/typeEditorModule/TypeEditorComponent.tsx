import { useState } from "react";
import { useDispatch } from "react-redux";
import { VIEW_TYPE } from "../../../models/project";
import { changeFlowView } from "../../../redux/store/flow/actions";

import { DropdownMenu } from ".";
import {
  TypeEditorWrapper,
  TypeEditorContent,
  TypeEditorHeader,
  TypeInfo,
  TypeNameInput,
} from "./styled";
import { Input } from "../../../componentLibrary";
import { TextResources } from "../../../assets/textResources";
import { CloseIcon } from "../../../assets/icons";

interface Props {
  mode: string;
}

export const TypeEditorComponent = ({ mode }: Props) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(true);
  const handleClick = () => {
    dispatch(changeFlowView(VIEW_TYPE.BLOCKVIEW, true));
    dispatch(changeFlowView(VIEW_TYPE.TREEVIEW, true));
    setVisible(!visible);
  };
  const aspects = [
    {
      id: 0,
      name: "Function",
    },
    {
      id: 1,
      name: "Product",
    },
    {
      id: 2,
      name: "Location",
    },
  ];
  return (
    <>
      {visible ? (
        <TypeEditorWrapper>
          <TypeEditorContent>
            <TypeEditorHeader>
              <p>{TextResources.TypeEditor}</p>
              <img src={CloseIcon} alt="close-window" onClick={handleClick} />
            </TypeEditorHeader>
            <TypeInfo>
              <DropdownMenu
                label="Aspect"
                placeHolder="Choose Aspect"
                listItems={aspects}
              />
              <DropdownMenu
                label="Object Type"
                placeHolder="Select Object Type"
                listItems={aspects}
              />
              <TypeNameInput>
                <p>Type name</p>
                <Input
                  width={300}
                  onChange={() => null}
                  inputType="text"
                  placeholder="Write Type name"
                />
              </TypeNameInput>
              <DropdownMenu
                label="Status"
                placeHolder="Draft"
                listItems={aspects}
              />
            </TypeInfo>
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