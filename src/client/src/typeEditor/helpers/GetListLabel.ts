import { ListType } from "../TypeEditorList";
import { CreateLibraryType } from "../../models";
import { IsInterface, IsLocation, IsTransport } from ".";
import { TypeEditorTextResources } from "../assets/TypeEditorTextResources";

const GetListLabel = (listType: ListType, createLibraryType: CreateLibraryType): string => {
  if (listType === ListType.Rds) return TypeEditorTextResources.PROPERTIES_RDS;

  if (
    listType === ListType.Terminals &&
    !IsLocation(createLibraryType.aspect) &&
    !(IsInterface(createLibraryType.objectType) || IsTransport(createLibraryType.objectType))
  )
    return TypeEditorTextResources.PROPERTIES_TERMINALS;

  if (listType === ListType.Terminals && (IsInterface(createLibraryType.objectType) || IsTransport(createLibraryType.objectType)))
    return TypeEditorTextResources.PROPERTIES_TERMINAL_TYPE;

  if ((listType === ListType.Terminals || listType === ListType.PredefinedAttributes) && IsLocation(createLibraryType.aspect))
    return TypeEditorTextResources.PROPERTIES_PREDEFINED_LOCATION_ATTRIBUTES;

  if (listType === ListType.ObjectAttributes) return TypeEditorTextResources.PROPERTIES_BLOCK_ATTRIBUTES;
  if (listType === ListType.LocationAttributes) return TypeEditorTextResources.PROPERTIES_LOCATION_ATTRIBUTES;
  if (listType === ListType.SimpleTypes) return TypeEditorTextResources.PROPERTIES_SIMPLE_TYPES;
};

export default GetListLabel;
