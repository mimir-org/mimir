import { TextResources } from "../assets/text";
import { TextInput, TypeInfo, TypeNameInput } from "./styled";
import { Dropdown } from "../compLibrary/dropdown/typeEditor";
import { Aspect, BlobData, CreateLibraryType, LocationType, ObjectType, Purpose } from "../models";
import { GetAspects, GetFilteredBlobData, GetLocationTypes, GetObjectTypes, GetPurposes, IsLocation } from "./helpers";
import { AspectKey, ObjectTypeKey } from "./types";

interface Props {
  createLibraryType: CreateLibraryType;
  icons: BlobData[];
  locationTypes: LocationType[];
  purposes: Purpose[];
  onChange: <K extends keyof CreateLibraryType>(key: K, value: CreateLibraryType[K]) => void;
}

const TypeEditorInputs = ({ onChange, createLibraryType, icons, locationTypes, purposes }: Props) => (
  <TypeInfo>
    <Dropdown
      label={TextResources.TypeEditor_Aspect}
      categories={GetAspects()}
      onChange={(data: AspectKey) => onChange("aspect", Aspect[data])}
      defaultValue={createLibraryType && createLibraryType.aspect?.toString()}
      placeholder={TextResources.TypeEditor_Aspect_Placeholder}
    />
    {createLibraryType && !IsLocation(createLibraryType.aspect) && (
      <Dropdown
        label={TextResources.TypeEditor_Object_Type}
        categories={GetObjectTypes(createLibraryType.aspect)}
        onChange={(data: ObjectTypeKey) => onChange("objectType", ObjectType[data])}
        defaultValue={createLibraryType && createLibraryType.objectType?.toString()}
        placeholder={TextResources.TypeEditor_Object_Placeholder}
      />
    )}
    {createLibraryType && IsLocation(createLibraryType.aspect) && (
      <Dropdown
        label={TextResources.TypeEditor_Location_Type}
        categories={GetLocationTypes(locationTypes)}
        hasCategory={true}
        onChange={(data: LocationType) => onChange("locationType", data.id)}
        defaultValue={createLibraryType && createLibraryType.locationType && createLibraryType.locationType.toString()}
        placeholder={TextResources.TypeEditor_Location_Placeholder}
      />
    )}
    <Dropdown
      label={TextResources.TypeEditor_Purpose}
      categories={GetPurposes(purposes)}
      onChange={(data: Purpose) => onChange("purpose", data.id)}
      defaultValue={createLibraryType && createLibraryType.purpose?.toString()}
      placeholder={TextResources.TypeEditor_Purpose_Placeholder}
    />
    <TypeNameInput>
      <p className="label">{TextResources.TypeEditor_Type_Name}</p>
      <TextInput
        type="text"
        defaultValue={createLibraryType && createLibraryType.name}
        placeholder={TextResources.TypeEditor_Type_Placeholder}
        onChange={(e: any) => {
          onChange("name", e.target.value);
        }}
      />
    </TypeNameInput>
    <Dropdown
      label={TextResources.TypeEditor_Symbol}
      categories={GetFilteredBlobData(icons)}
      onChange={(data: BlobData) => onChange("symbolId", data.id)}
      placeholder={TextResources.TypeEditor_Symbol_Placeholder}
      defaultValue={createLibraryType && createLibraryType.symbolId}
    />
  </TypeInfo>
);

export default TypeEditorInputs;
