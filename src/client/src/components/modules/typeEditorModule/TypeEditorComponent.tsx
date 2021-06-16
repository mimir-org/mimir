import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useHistory } from "react-router-dom";
import { MODULE_TYPE } from "../../../models/project";
import { TextResources } from "../../../assets/textResources";
import { CloseIcon } from "../../../assets/icons/common";
import { TypeEditorState } from "../../../redux/store/typeEditor/types";
import { changeFlowView } from "../../../redux/store/flow/actions";
import {
  changeMode,
  changeTypeName,
} from "../../../redux/store/typeEditor/actions";
import {
  getInitialData,
  getRDS,
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

export const TypeEditorComponent = () => {
  const { push } = useHistory();
  const dispatch = useDispatch();

  const [typenameInput, settypenameInput] = useState("");

  const state = useSelector<RootState>(
    (state) => state.typeEditor
  ) as TypeEditorState;

  const handleClick = () => {
    dispatch(changeMode("NotSet"));
    dispatch(changeFlowView(MODULE_TYPE.TYPEEDITOR));
    push(`/home/`);
  };

  const handleChange = (e) => {
    settypenameInput(e.target.value);
    dispatch(changeTypeName(e.target.value));
  };

  const filterAspects = () => {
    let filteredAspects = Object.entries(state.aspects);
    filteredAspects = filteredAspects.filter(
      ([, value]) => value === "Function" || value === "Location"
    );
    return filteredAspects;
  };

  const filterObjectTypes = () => {
    let filteredTypes = Object.entries(state.objectTypes);
    if (state.aspect === "NotSet") {
      filteredTypes = [];
    } else if (state.aspect === "Function") {
      filteredTypes = filteredTypes.filter(
        ([, value]) =>
          value === "Object Block" ||
          value === "Transport" ||
          value === "Interface"
      );
    }
    return filteredTypes;
  };

  const filterStatuses = () => {
    let filteredStatuses = Object.entries(state.statuses);
    filteredStatuses = filteredStatuses.filter(
      ([, value]) =>
        value === "Draft" || value === "Complete" || value === "Approved"
    );
    return filteredStatuses;
  };

  useEffect(() => {
    dispatch(getInitialData());
    dispatch(getRDS(state.aspect));
    // dispatch(getTerminals());
    // dispatch(getAttributes(state.aspect));
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
            listItems={filterAspects()}
          />
          <DropdownMenu
            label={TextResources.TypeEditor_Object_Type}
            placeHolder="Select Object Type"
            listItems={filterObjectTypes()}
          />
          <TypeNameInput>
            <p>{TextResources.TypeEditor_Type_Name}</p>
            <TextInput
              inputType="text"
              value={typenameInput}
              placeholder="Write Type name"
              onChange={handleChange}
            />
          </TypeNameInput>
          <DropdownMenu
            label={TextResources.TypeEditor_Status}
            placeHolder="Draft"
            listItems={filterStatuses()}
          />
        </TypeInfo>
        <ChooseProperties>
          <RDSList />
          <TerminalsList />
          <AttributesList />
          <TypePreview />
        </ChooseProperties>
        {/* <TypeEditorInspector></TypeEditorInspector> */}
      </TypeEditorContent>
    </TypeEditorWrapper>
  );
};

export default TypeEditorComponent;
