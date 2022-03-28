import { ListType, TypeEditorListProps } from "../TypeEditorList";
import { TypeEditorState } from "../redux/types";
import { Dispatch } from "redux";
import { OnPropertyChange, OnTerminalCategoryChange } from "../handlers";
import { IsLocation, IsProduct } from "./index";
import { TypeEditorTextResources } from "../assets/TypeEditorTextResources";
import {
  IsAttributeTypesSelectionInvalid,
  IsPredefinedAttributesSelectionInvalid,
  IsRdsSelectionInvalid,
  IsTerminalTypesSelectionInvalid,
} from "../validators";

interface TypeEditorListDescriptor extends TypeEditorListProps {
  isVisible: boolean;
  validation: {
    visible: boolean;
    message: string;
  };
}

/**
 * Generates a descriptor for a given ListType.
 * The descriptor describes the view state of a ListType given the application state provided
 * @param listType ListType to generate descriptor for
 * @param state State of the TypeEditor at render
 * @param dispatch General dispatch function for the application
 */
export function GetTypeEditorListDescriptor(
  listType: ListType,
  state: TypeEditorState,
  dispatch: Dispatch
): TypeEditorListDescriptor {
  switch (listType) {
    case ListType.Rds:
      return {
        listType: ListType.Rds,
        isVisible: true,
        items: state?.rdsList,
        createLibraryType: state?.createLibraryType,
        onPropertyChange: (key, data) => OnPropertyChange(key, data, dispatch),
        validation: {
          visible: state?.validationVisibility && IsRdsSelectionInvalid(state?.createLibraryType),
          message: TypeEditorTextResources.ERROR_RDS,
        },
      };
    case ListType.Terminals:
      return {
        listType: ListType.Terminals,
        isVisible: !IsLocation(state?.createLibraryType.aspect),
        items: state?.terminals,
        createLibraryType: state?.createLibraryType,
        onPropertyChange: (key, data) => OnPropertyChange(key, data, dispatch),
        onTerminalCategoryChange: (key, data) => OnTerminalCategoryChange(key, data, dispatch),
        validation: {
          visible: state?.validationVisibility && IsTerminalTypesSelectionInvalid(state?.createLibraryType),
          message: TypeEditorTextResources.ERROR_TERMINALS,
        },
      };
    case ListType.PredefinedAttributes:
      return {
        listType: ListType.PredefinedAttributes,
        isVisible: IsLocation(state?.createLibraryType.aspect),
        items: state?.predefinedAttributes,
        createLibraryType: state?.createLibraryType,
        onPropertyChange: (key, data) => OnPropertyChange(key, data, dispatch),
        validation: {
          visible: state?.validationVisibility && IsPredefinedAttributesSelectionInvalid(state?.createLibraryType),
          message: TypeEditorTextResources.ERROR_LOCATION_ATTRIBUTES,
        },
      };
    case ListType.ObjectAttributes:
      return {
        listType: ListType.ObjectAttributes,
        isVisible: !IsLocation(state?.createLibraryType.aspect),
        items: state?.attributes,
        createLibraryType: state?.createLibraryType,
        onPropertyChange: (key, data) => OnPropertyChange(key, data, dispatch),
        validation: {
          visible: state?.validationVisibility && IsAttributeTypesSelectionInvalid(state?.createLibraryType),
          message: TypeEditorTextResources.ERROR_ATTRIBUTES,
        },
      };
    case ListType.LocationAttributes:
      return {
        listType: ListType.LocationAttributes,
        isVisible: IsLocation(state?.createLibraryType.aspect),
        items: state?.attributes,
        createLibraryType: state?.createLibraryType,
        onPropertyChange: (key, data) => OnPropertyChange(key, data, dispatch),
        validation: {
          visible: state?.validationVisibility && IsAttributeTypesSelectionInvalid(state?.createLibraryType),
          message: TypeEditorTextResources.ERROR_ATTRIBUTES,
        },
      };
    case ListType.SimpleTypes:
      return {
        listType: ListType.SimpleTypes,
        isVisible: IsProduct(state?.createLibraryType.aspect),
        items: state?.simpleTypes,
        createLibraryType: state?.createLibraryType,
        onPropertyChange: (key, data) => OnPropertyChange(key, data, dispatch),
        validation: {
          visible: false,
          message: "",
        },
      };
    default:
      return {
        listType: undefined,
        isVisible: false,
        items: undefined,
        createLibraryType: undefined,
        validation: {
          message: "",
          visible: false,
        },
      };
  }
}
