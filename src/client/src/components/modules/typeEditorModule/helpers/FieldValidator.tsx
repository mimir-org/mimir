import { TypeEditorState } from "../../../../redux/store/typeEditor/types";
import { Aspect, ObjectType, Status } from "../../../../models";

const FieldValidator = (state: TypeEditorState, input: string) => {
  const aspect = state.createLibraryType.aspect;
  const objectType = state.createLibraryType.objectType;
  const locationType = state.createLibraryType.locationType;
  const name = state.createLibraryType.name;
  const symbol = state.createLibraryType.symbolId;
  const status = state.createLibraryType.status;
  const rds = state.createLibraryType.rdsId;
  const terminals = state.createLibraryType.terminalTypes;
  const predefinedAttributes = state.createLibraryType.predefinedAttributes;
  const attributes = state.createLibraryType.attributeTypes;

  const isFunction = aspect === Aspect.Function;
  const isLocation = aspect === Aspect.Location;

  const validAspect = aspect !== Aspect.NotSet;
  const validObjectType = isFunction && objectType !== ObjectType.NotSet;
  const validLocationType = isLocation && locationType !== "";
  const validName = name !== "";
  const validSymbol = symbol !== "";
  const validStatus = status !== Status.NotSet;
  const validRds = rds !== "";
  const validTerminals = isFunction && terminals !== [];
  const validPredefinedAttributes = isLocation && predefinedAttributes !== [];
  const validAttributes = attributes !== [];

  switch (input) {
    case "objectType":
      if (!validAspect) {
        return true;
      }
      break;
    case "typeName":
      if (!validObjectType && !validLocationType) {
        return true;
      }
      break;
    case "symbol":
      if ((!validObjectType && !validLocationType) || !validName) {
        return true;
      }
      break;
    case "status":
      if (
        (!validObjectType && !validLocationType) ||
        !validName ||
        !validSymbol
      ) {
        return true;
      }
      break;
    case "rds":
      if (
        (!validObjectType && !validLocationType) ||
        !validName ||
        !validSymbol ||
        !validStatus
      ) {
        return true;
      }
      break;
    case "terminals":
      if (
        (!validObjectType && !validLocationType) ||
        !validName ||
        !validSymbol ||
        !validStatus ||
        !validRds
      ) {
        return true;
      }
      break;
    case "add":
      if (
        (!validObjectType && !validLocationType) ||
        !validName ||
        !validSymbol ||
        !validStatus ||
        !validRds ||
        (!validTerminals && !validPredefinedAttributes) ||
        !validAttributes
      ) {
        return true;
      }
      break;
    default:
      return true;
  }
};

export default FieldValidator;
