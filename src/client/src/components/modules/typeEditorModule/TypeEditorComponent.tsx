import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
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
import { SetView } from "../../../redux/store/localStorage";

interface Props {
  mode: string;
}

export const TypeEditorComponent = ({ mode }: Props) => {
  const { push } = useHistory();
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(changeFlowView(VIEW_TYPE.TREEVIEW));
    SetView(VIEW_TYPE.TREEVIEW);
    push(`/home/${VIEW_TYPE.TREEVIEW}`);
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
  );
};

export default TypeEditorComponent;
