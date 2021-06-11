import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useHistory } from "react-router-dom";
import { MODULE_TYPE } from "../../../models/project";
import { TextResources } from "../../../assets/textResources";
import { CloseIcon } from "../../../assets/icons/common";
import { TypeEditorState } from "../../../redux/store/typeEditor/types";
import { changeFlowView } from "../../../redux/store/flow/actions";
import {
  getInitialData,
  getRDS,
  getTerminals,
} from "../../../redux/store/typeEditor/actions";
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
  TextInput,
  ChooseProperties,
} from "./styled";

interface Props {
  mode: string;
}

export const TypeEditorComponent = ({ mode }: Props) => {
  const { push } = useHistory();
  const dispatch = useDispatch();

  const state = useSelector<RootState>(
    (state) => state.typeEditor
  ) as TypeEditorState;

  const handleClick = () => {
    dispatch(changeFlowView(MODULE_TYPE.TYPEEDITOR));
    push(`/home/${MODULE_TYPE.TYPEEDITOR}`);
  };

  useEffect(() => {
    dispatch(getInitialData());
    dispatch(getRDS(state.aspect));
    dispatch(getTerminals());
  }, [dispatch, state.aspect]);

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
            listItems={Object.entries(state.aspects)}
          />
          <DropdownMenu
            label={TextResources.TypeEditor_Object_Type}
            placeHolder="Select Object Type"
            listItems={Object.entries(state.objectTypes)}
          />
          <TypeNameInput>
            <p>{TextResources.TypeEditor_Type_Name}</p>
            <TextInput
              onChange={() => null}
              inputType="text"
              placeholder="Write Type name"
            />
          </TypeNameInput>
          <DropdownMenu
            label={TextResources.TypeEditor_Status}
            placeHolder="Choose Status"
            listItems={Object.entries(state.statuses)}
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
