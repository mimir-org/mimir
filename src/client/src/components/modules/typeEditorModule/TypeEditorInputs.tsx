import { TextResources } from "../../../assets/text";
import { TextInput, TypeInfo, TypeNameInput } from "./styled";
import { Dropdown } from "../../../compLibrary/dropdown/typeEditor";
import { BlobData, CreateLibraryType, LocationType, Purpose } from "../../../models";
import { GetAspects, GetBlobData, GetLocationTypes, GetObjectTypes, GetPurposes, IsLocation } from "./helpers";

interface Props {
  onChange: Function;
  createLibraryType: CreateLibraryType;
  icons: BlobData[];
  locationTypes: LocationType[];
  purposes: Purpose[];
}

const TypeEditorInputs = ({ onChange, createLibraryType, icons, locationTypes, purposes }: Props) => {
  return (
    <TypeInfo>
      <Dropdown
        label={TextResources.TypeEditor_Aspect}
        items={GetAspects()}
        keyProp="id"
        valueProp="name"
        onChange={(data: any) => onChange("aspect", Number(data))}
        // disabled={FieldValidator(state, "symbol")}
        defaultValue={createLibraryType && createLibraryType.aspect?.toString()}
        placeholder={TextResources.TypeEditor_Aspect_Placeholder}
      />
      {createLibraryType && !IsLocation(createLibraryType.aspect) && (
        <Dropdown
          label={TextResources.TypeEditor_Object_Type}
          items={GetObjectTypes()}
          keyProp="id"
          valueProp="name"
          onChange={(data: any) => onChange("objectType", Number(data))}
          // disabled={FieldValidator(state, "symbol")}
          defaultValue={createLibraryType && createLibraryType.objectType?.toString()}
          placeholder={TextResources.TypeEditor_Object_Placeholder}
        />
      )}
      {createLibraryType && IsLocation(createLibraryType.aspect) && (
        <Dropdown
          label={TextResources.TypeEditor_Location_Type}
          items={GetLocationTypes(locationTypes)}
          hasCategory={true}
          keyProp="id"
          valueProp="name"
          onChange={(data: any) => onChange("locationType", data)}
          // disabled={FieldValidator(state, "symbol")}
          defaultValue={createLibraryType && createLibraryType.locationType && createLibraryType.locationType.toString()}
          placeholder={TextResources.TypeEditor_Location_Placeholder}
        />
      )}
      <Dropdown
        label={TextResources.TypeEditor_Purpose}
        items={GetPurposes(purposes)}
        keyProp="id"
        valueProp="name"
        onChange={(data: any) => onChange("purpose", data)}
        // disabled={FieldValidator(state, "symbol")}
        defaultValue={createLibraryType && createLibraryType.purpose?.toString()}
        placeholder={TextResources.TypeEditor_Purpose_Placeholder}
      />
      <TypeNameInput>
        <p className="label">{TextResources.TypeEditor_Type_Name}</p>
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
        placeholder={TextResources.TypeEditor_Symbol_Placeholder}
        // disabled={FieldValidator(state, "symbol")}
        defaultValue={createLibraryType && createLibraryType.symbolId}
      />
    </TypeInfo>
  );
};

export default TypeEditorInputs;
