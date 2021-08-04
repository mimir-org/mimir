import { useState, useEffect } from "react";
import { DropdownMenu } from ".";
import { TextResources } from "../../../assets/text";
import { Dropdown } from "../../../compLibrary/dropdown";
import { Aspect, ObjectType, Status } from "../../../models";
import { TypeEditorState } from "../../../redux/store/typeEditor/types";
import {
  GetAspects,
  GetObjectTypes,
  GetStatus,
  IsLocation,
  GetDefaultValue,
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
    if (aspect === Aspect.NotSet) {
      setTypeName(GetDefaultValue("typeName"));
    }
  }, [aspect]);

  return (
    <TypeInfo>
      <DropdownMenu
        label={TextResources.TypeEditor_Aspect}
        items={GetAspects(state)}
        aspect={aspect}
        type={Aspect.NotSet}
        onChange={onAspectChange}
      />
      <DropdownMenu
        label={
          IsLocation(aspect)
            ? TextResources.TypeEditor_Location_Type
            : TextResources.TypeEditor_Object_Type
        }
        items={GetObjectTypes(state)}
        aspect={aspect}
        type={ObjectType.NotSet}
        onChange={onObjectTypeChange}
      />
      <TypeNameInput>
        <p>{TextResources.TypeEditor_Type_Name}</p>
        <TextInput
          inputType="text"
          value={typeName}
          placeholder={TextResources.TypeEditor_Type_Placeholder}
          onChange={onNameChange}
        />
      </TypeNameInput>
      <DropdownMenu
        label={TextResources.TypeEditor_Status}
        items={GetStatus(state)}
        aspect={aspect}
        type={Status.NotSet}
        onChange={onStatusChange}
      />
      <Dropdown
        label={TextResources.TypeEditor_Symbol}
        items={state.icons}
        keyProp="id"
        valueProp="name"
        valueImageProp="data"
        onChange={onSymbolChange}
      />
    </TypeInfo>
  );
};

export default TypeEditorInputs;
