import { useState } from "react";
import { useDispatch } from "react-redux";
import { VIEW_TYPE } from "../../../models/project";
import { changeFlowView } from "../../../redux/store/flow/actions";

import {
  DropdownMenu,
  RDSList,
  TerminalsList,
  AttributesList,
  TypePreview,
} from ".";
import {
  TypeEditorWrapper,
  TypeEditorContent,
  TypeEditorHeader,
  TypeInfo,
  TypeNameInput,
  ChooseProperties,
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
                label={TextResources.TypeEditor_Aspect}
                placeHolder="Choose Aspect"
                listItems={aspects}
              />
              <DropdownMenu
                label={TextResources.TypeEditor_Object_Type}
                placeHolder="Select Object Type"
                listItems={aspects}
              />
              <TypeNameInput>
                <p>{TextResources.TypeEditor_Type_Name}</p>
                <Input
                  width={300}
                  onChange={() => null}
                  inputType="text"
                  placeholder="Write Type name"
                />
              </TypeNameInput>
              <DropdownMenu
                label={TextResources.TypeEditor_Status}
                placeHolder="Draft"
                listItems={aspects}
              />
            </TypeInfo>
            <ChooseProperties>
              <RDSList />
              <TerminalsList />
              <AttributesList />
              <TypePreview mode={mode} />
            </ChooseProperties>
            {/* <TypeEditorInspector></TypeEditorInspector> */}
          </TypeEditorContent>
        </TypeEditorWrapper>
      ) : null}
    </>
  );
};

export default TypeEditorComponent;
