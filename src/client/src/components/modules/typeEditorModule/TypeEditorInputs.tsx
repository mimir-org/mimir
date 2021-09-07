import { TextResources } from "../../../assets/text";
import { Dropdown } from "../../../compLibrary/dropdown";
import { BlobData, CreateLibraryType, LocationType } from "../../../models";
import {
  GetAspects,
  GetBlobData,
  GetLocationTypes,
  GetObjectTypes,
} from "./helpers";
import { TextInput, TypeInfo, TypeNameInput } from "./styled";

interface Props {
  onChange: Function;
  createLibraryType: CreateLibraryType;
  icons: BlobData[];
  locationTypes: LocationType[];
}

const TypeEditorInputs = ({
  onChange,
  createLibraryType,
  icons,
  locationTypes,
}: Props) => {
  return (
    <TypeInfo>
      <Dropdown
        label={TextResources.TypeEditor_Aspect}
        items={GetAspects()}
        keyProp="id"
        valueProp="name"
        onChange={(data: any) => onChange("aspect", data)}
        // disabled={FieldValidator(state, "symbol")}
        defaultValue={createLibraryType && createLibraryType.aspect.toString()}
      />
      <Dropdown
        label={TextResources.TypeEditor_Object_Type}
        items={GetObjectTypes()}
        keyProp="id"
        valueProp="name"
        onChange={(data: any) => onChange("objectType", data)}
        // disabled={FieldValidator(state, "symbol")}
        defaultValue={
          createLibraryType && createLibraryType.objectType.toString()
        }
      />
      <Dropdown
        label={TextResources.TypeEditor_Location_Type}
        items={GetLocationTypes(locationTypes)}
        hasCategory={true}
        keyProp="id"
        valueProp="name"
        onChange={(data: any) => onChange("locationType", data)}
        // disabled={FieldValidator(state, "symbol")}
        defaultValue={
          createLibraryType && createLibraryType.locationType.toString()
        }
      />
      <TypeNameInput>
        <p>{TextResources.TypeEditor_Type_Name}</p>
        <TextInput
          inputType="text"
          defaultValue={createLibraryType && createLibraryType.name}
          placeholder={TextResources.TypeEditor_Type_Placeholder}
          onChange={(e: any) => {
            onChange("name", e.target.value);
          }}
          //   disabled={FieldValidator(state, "typeName")}
        />
      </TypeNameInput>
      <Dropdown
        label={TextResources.TypeEditor_Symbol}
        items={GetBlobData(icons)}
        keyProp="id"
        valueProp="name"
        valueImageProp="data"
        onChange={(data: any) => {
          onChange("symbolId", data);
        }}
        // disabled={FieldValidator(state, "symbol")}
        defaultValue={createLibraryType && createLibraryType.symbolId}
      />
    </TypeInfo>
  );
};

export default TypeEditorInputs;
