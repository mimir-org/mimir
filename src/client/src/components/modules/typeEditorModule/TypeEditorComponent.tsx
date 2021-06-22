import red from "../../../redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useHistory } from "react-router-dom";
import { MODULE_TYPE } from "../../../models/project";
import { Aspect } from "../../../models/";
import { TextResources } from "../../../assets/textResources";
import { CloseIcon } from "../../../assets/icons/common";
import { TypeEditorState } from "../../../redux/store/typeEditor/types";
import { changeFlowView } from "../../../redux/store/flow/actions";
import { SetDarkModeColor } from "../../flow/helpers/common";
import { changeAllModulesVisibility } from "../../../redux/store/modules/actions";
import {
  changeMode,
  changeTypeName,
} from "../../../redux/store/typeEditor/actions";
import { getInitialData } from "../../../redux/store/typeEditor/actions";
import {
  DropdownMenu,
  RDSList,
  TerminalsList,
  AttributesList,
  TypePreview,
  TypeEditorInspector,
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
    push(`/home/treeview`);
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
    let filteredtypes = Object.entries(state.objectTypes);
    state.createLibraryType.aspect === Aspect.NotSet
      ? (filteredtypes = [])
      : state.createLibraryType.aspect === Aspect.Function
      ? (filteredtypes = filteredtypes.filter(
          ([, value]) => value !== "Not set"
        ))
      : (filteredtypes = []);
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
    const darkMode = red.store.getState().darkMode.active as boolean;
    SetDarkModeColor(darkMode);
    dispatch(getInitialData());
    dispatch(changeAllModulesVisibility(false, true));
    // dispatch(getAttributes(state.aspect));
  }, [
    dispatch,
    state.createLibraryType.aspect,
    state.createLibraryType.objectType,
    state.createLibraryType.status,
  ]);

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
            label={
              state.createLibraryType.aspect === Aspect.Location
                ? TextResources.TypeEditor_Location_Type
                : TextResources.TypeEditor_Object_Type
            }
            placeHolder={
              state.createLibraryType.aspect === Aspect.Location
                ? "Select " + TextResources.TypeEditor_Location_Type
                : "Select " + TextResources.TypeEditor_Object_Type
            }
            listItems={Object.entries(state.objectTypes)}
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
        <TypeEditorInspector />
      </TypeEditorContent>
    </TypeEditorWrapper>
  );
};

export default TypeEditorComponent;
