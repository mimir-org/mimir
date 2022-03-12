import React from "react";
import { TypeEditorTextResources } from "./assets/TypeEditorTextResources";
import { TextInput, TypeInfo, TypeNameInput } from "./styled";
import { Dropdown } from "../compLibrary/dropdown/typeEditor";
import { Aspect, BlobData, CreateLibraryType, LocationType, ObjectType, Purpose } from "../models";
import { GetAspects, GetFilteredBlobData, GetLocationTypes, GetObjectTypes, GetPurposes, IsLocation } from "./helpers";
import { AspectKey, ObjectTypeKey } from "./types";
import Validation from "./validation/Validation";
import {
  IsAspectSelectionInvalid,
  IsLocationSelectionInvalid,
  IsObjectSelectionInvalid,
  IsPurposeSelectionInvalid,
  IsSymbolSelectionInvalid,
  IsTypeNameInvalid,
} from "./validators";

interface Props {
  createLibraryType: CreateLibraryType;
  icons: BlobData[];
  locationTypes: LocationType[];
  purposes: Purpose[];
  onChange: <K extends keyof CreateLibraryType>(key: K, value: CreateLibraryType[K]) => void;
  isValidationVisible: boolean;
}

const TypeEditorInputs = ({ onChange, createLibraryType, icons, locationTypes, purposes, isValidationVisible }: Props) => (
  <TypeInfo>
    <Validation
      minWidth={"15%"}
      visible={isValidationVisible && IsAspectSelectionInvalid(createLibraryType)}
      message={TypeEditorTextResources.ERROR_ASPECT}
    >
      <Dropdown
        label={TypeEditorTextResources.ASPECT}
        categories={GetAspects()}
        onChange={(data: AspectKey) => onChange("aspect", Aspect[data])}
        defaultValue={createLibraryType && createLibraryType.aspect?.toString()}
        placeholder={TypeEditorTextResources.ASPECT_PLACEHOLDER}
      />
    </Validation>

    {createLibraryType && !IsLocation(createLibraryType.aspect) && (
      <Validation
        minWidth={"15%"}
        visible={isValidationVisible && IsObjectSelectionInvalid(createLibraryType)}
        message={TypeEditorTextResources.ERROR_OBJECT_TYPE}
      >
        <Dropdown
          label={TypeEditorTextResources.OBJECT_TYPE}
          categories={GetObjectTypes(createLibraryType.aspect)}
          onChange={(data: ObjectTypeKey) => onChange("objectType", ObjectType[data])}
          defaultValue={createLibraryType && createLibraryType.objectType?.toString()}
          placeholder={TypeEditorTextResources.OBJECT_PLACEHOLDER}
        />
      </Validation>
    )}

    {createLibraryType && IsLocation(createLibraryType.aspect) && (
      <Validation
        minWidth={"15%"}
        visible={isValidationVisible && IsLocationSelectionInvalid(createLibraryType)}
        message={TypeEditorTextResources.ERROR_LOCATION_TYPE}
      >
        <Dropdown
          label={TypeEditorTextResources.LOCATION_TYPE}
          categories={GetLocationTypes(locationTypes)}
          hasCategory
          onChange={(data: LocationType) => onChange("locationType", data.id)}
          defaultValue={createLibraryType && createLibraryType.locationType && createLibraryType.locationType.toString()}
          placeholder={TypeEditorTextResources.LOCATION_PLACEHOLDER}
        />
      </Validation>
    )}

    <Validation
      minWidth={"15%"}
      visible={isValidationVisible && IsPurposeSelectionInvalid(createLibraryType)}
      message={TypeEditorTextResources.ERROR_PURPOSE}
    >
      <Dropdown
        label={TypeEditorTextResources.PURPOSE}
        categories={GetPurposes(purposes)}
        onChange={(data: Purpose) => onChange("purpose", data.id)}
        defaultValue={createLibraryType && createLibraryType.purpose?.toString()}
        placeholder={TypeEditorTextResources.PURPOSE_PLACEHOLDER}
      />
    </Validation>

    <Validation
      minWidth={"15%"}
      visible={isValidationVisible && IsTypeNameInvalid(createLibraryType)}
      message={TypeEditorTextResources.ERROR_NAME}
    >
      <TypeNameInput>
        <p className="label">{TypeEditorTextResources.TYPE_NAME}</p>
        <TextInput
          type="text"
          defaultValue={createLibraryType && createLibraryType.name}
          placeholder={TypeEditorTextResources.TYPE_PLACEHOLDER}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            onChange("name", e.target.value);
          }}
        />
      </TypeNameInput>
    </Validation>

    <Validation
      minWidth={"15%"}
      visible={isValidationVisible && IsSymbolSelectionInvalid(createLibraryType)}
      message={TypeEditorTextResources.ERROR_SYMBOL}
    >
      <Dropdown
        label={TypeEditorTextResources.SYMBOL}
        categories={GetFilteredBlobData(icons)}
        onChange={(data: BlobData) => onChange("symbolId", data.id)}
        placeholder={TypeEditorTextResources.SYMBOL_PLACEHOLDER}
        defaultValue={createLibraryType && createLibraryType.symbolId}
      />
    </Validation>
  </TypeInfo>
);

export default TypeEditorInputs;
