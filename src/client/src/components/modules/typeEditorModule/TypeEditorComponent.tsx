import red from "../../../redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useHistory } from "react-router-dom";
import { MODULE_TYPE } from "../../../models/project";
import { Aspect, TypeMode, ObjectType } from "../../../models/";
import { TextResources } from "../../../assets/text";
import { CloseIcon } from "../../../assets/icons/common";
import { TypeEditorState } from "../../../redux/store/typeEditor/types";
import { changeFlowView } from "../../../redux/store/flow/actions";
import { SetDarkModeColor } from "../../flow/helpers/common";
import { changeAllModulesVisibility } from "../../../redux/store/modules/actions";
import { Dropdown } from "../../../compLibrary/dropdown";
import {
  getInitialData,
  getBlobData,
} from "../../../redux/store/typeEditor/actions";
import {
  changeMode,
  changeTypeName,
  symbolChanged,
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

  const aspect = state.createLibraryType.aspect;
  const objectType = state.createLibraryType.objectType;

  const handleClick = () => {
    // dispatch(resetCreateLibrary());
    dispatch(changeMode(TypeMode.NotSet));
    dispatch(changeFlowView(MODULE_TYPE.TYPEEDITOR));
    push(`/home`);
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
    let filteredtypes = [];
    if (aspect === Aspect.Function) {
      filteredtypes = Object.entries(state.objectTypes);
    } else if (aspect === Aspect.Location) {
      filteredtypes = Object.entries(state.locationTypes);
    }
    return filteredtypes;
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
    dispatch(getBlobData());
  }, [dispatch, aspect, objectType, state.createLibraryType.status]);

  const handleSymbolChanged = (value) => {
    dispatch(symbolChanged(value.id));
  };

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
            placeHolder={TextResources.TypeEditor_Aspect_Placeholder}
            listItems={filterAspects()}
          />
          <DropdownMenu
            label={
              aspect === Aspect.Location
                ? TextResources.TypeEditor_Location_Type
                : TextResources.TypeEditor_Object_Type
            }
            placeHolder={
              aspect === Aspect.Location
                ? "Select " + TextResources.TypeEditor_Location_Type
                : "Select " + TextResources.TypeEditor_Object_Type
            }
            listItems={filterObjectTypes()}
            aspect={aspect}
          />
          <TypeNameInput>
            <p>{TextResources.TypeEditor_Type_Name}</p>
            <TextInput
              inputType="text"
              value={typenameInput}
              placeholder={TextResources.TypeEditor_Type_Placeholder}
              onChange={handleChange}
            />
          </TypeNameInput>
          <DropdownMenu
            label={TextResources.TypeEditor_Status}
            placeHolder={TextResources.TypeEditor_Draft_Placeholder}
            listItems={filterStatuses()}
          />
          <Dropdown
            label={TextResources.TypeEditor_Symbol}
            items={state.icons}
            keyProp="id"
            valueProp="name"
            valueImageProp="data"
            onChange={handleSymbolChanged}
          />
        </TypeInfo>
        <ChooseProperties>
          <RDSList state={state} />
          <TerminalsList state={state} />
          {objectType === ObjectType.Interface ? null : (
            <AttributesList state={state} />
          )}
          <TypePreview state={state} />
        </ChooseProperties>
        {/* <TypeEditorInspector /> */}
      </TypeEditorContent>
    </TypeEditorWrapper>
  );
};

export default TypeEditorComponent;

//The intention for the code below is to fill out values in the input fields when editing an existing type.
// (its not done)
//   useEffect(() => {
//     if (state.mode === TypeMode.Edit) {
//       let typeToEdit = state.createLibraryType;
//       typeToEdit.name = ""; //string
//       typeToEdit.status = null; //Status;
//       typeToEdit.aspect = null; //Aspect;
//       typeToEdit.objectType = null; //ObjectType;
//       typeToEdit.semanticReference = ""; //string;
//       typeToEdit.rdsId = ""; //string;
//       typeToEdit.terminalTypes = []; //TerminalTypeItem[];
//       typeToEdit.attributeTypes = [""]; //string[];
//       typeToEdit.locationType = "";
//       typeToEdit.predefinedAttributes = [];
//       typeToEdit.terminalTypeId = ""; //string;
//     }
//   }, [state.mode, state.createLibraryType]);
