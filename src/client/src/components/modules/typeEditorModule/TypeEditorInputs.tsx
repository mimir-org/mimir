import { useState, useEffect } from "react";
import { DropdownMenu } from ".";
import { TextResources } from "../../../assets/text";
import { Dropdown } from "../../../compLibrary/dropdown";
import { Aspect, ObjectType, Status, TypeMode } from "../../../models";
import { TypeEditorState } from "../../../redux/store/typeEditor/types";
import {
  GetAspects,
  GetObjectTypes,
  GetStatus,
  IsLocation,
  GetDefaultValue,
  GetTypeValue,
  FieldValidator,
} from "./helpers";
import { TextInput, TypeInfo, TypeNameInput } from "./styled";
import {
  changeSymbol,
  changeTypeName,
  changeSelectedAspect,
  changeSelectedObjectType,
  changeStatus,
} from "../../../redux/store/typeEditor/actions";

interface Props {
  state: TypeEditorState;
  dispatch;
}

const TypeEditorInputs = ({ state, dispatch }: Props) => {
  const aspect = state.createLibraryType.aspect;
  const mode = state.mode;
  const [typeName, setTypeName] = useState("");

  const onAspectChange = (value) => {
    dispatch(changeSelectedAspect(Number(value)));
  };

  const onObjectTypeChange = (value) => {
    dispatch(changeSelectedObjectType(Number(value)));
  };

  const onNameChange = (e) => {
    setTypeName(e.target.value);
    dispatch(changeTypeName(e.target.value));
  };

  const onStatusChange = (value) => {
    dispatch(changeStatus(Number(value)));
  };

  const onSymbolChange = (value) => {
    dispatch(changeSymbol(value.id));
  };

  useEffect(() => {
    if (mode === TypeMode.New) {
      setTypeName(GetDefaultValue("typeName"));
    }
    if (mode === TypeMode.Edit) {
      setTypeName(GetTypeValue(state, "typeName"));
    }
  }, [state, mode]);

  return (
    <TypeInfo>
      <DropdownMenu
        label={TextResources.TypeEditor_Aspect}
        items={GetAspects(state)}
        type={Aspect.NotSet}
        onChange={onAspectChange}
        disabled={false}
        state={state}
      />
      <DropdownMenu
        label={
          IsLocation(aspect)
            ? TextResources.TypeEditor_Location_Type
            : TextResources.TypeEditor_Object_Type
        }
        items={GetObjectTypes(state)}
        type={ObjectType.NotSet}
        onChange={onObjectTypeChange}
        disabled={FieldValidator(state, "objectType")}
        state={state}
      />
      <TypeNameInput disabled={FieldValidator(state, "typeName")}>
        <p>{TextResources.TypeEditor_Type_Name}</p>
        <TextInput
          inputType="text"
          value={typeName}
          placeholder={TextResources.TypeEditor_Type_Placeholder}
          onChange={onNameChange}
          disabled={FieldValidator(state, "typeName")}
        />
      </TypeNameInput>
      <Dropdown
        label={TextResources.TypeEditor_Symbol}
        items={state.icons}
        keyProp="id"
        valueProp="name"
        valueImageProp="data"
        onChange={onSymbolChange}
        disabled={FieldValidator(state, "symbol")}
        defaultValue={
          mode === TypeMode.Edit ? GetTypeValue(state, "symbol") : null
        }
      />
      <DropdownMenu
        label={TextResources.TypeEditor_Status}
        items={GetStatus(state)}
        type={Status.NotSet}
        onChange={onStatusChange}
        disabled={FieldValidator(state, "status")}
        state={state}
      />
    </TypeInfo>
  );
};

export default TypeEditorInputs;
