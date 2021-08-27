import { TypeEditorState } from "../../../../redux/store/typeEditor/types";
import { Aspect, ObjectType, TypeMode } from "../../../../models";

const FieldValidator = (state: TypeEditorState, input: string) => {
  const aspect = state.createLibraryType.aspect;
  const objectType = state.createLibraryType.objectType;
  const locationType = state.createLibraryType.locationType;
  const name = state.createLibraryType.name;
  const symbol = state.createLibraryType.symbolId;
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
  const validRds = rds !== "";
  const validTerminals = isFunction && terminals.length !== 0;
  const validPredefinedAttributes =
    isLocation && predefinedAttributes.length !== 0;
  const validAttributes = attributes.length !== 0;

  if (state.mode === TypeMode.Edit) {
    return false;
  } else {
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
      case "rds":
        if (
          (!validObjectType && !validLocationType) ||
          !validName ||
          !validSymbol
        ) {
          return true;
        }
        break;
      case "terminals":
        if (
          (!validObjectType && !validLocationType) ||
          !validName ||
          !validSymbol ||
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
          !validRds ||
          (!validTerminals && !validPredefinedAttributes) ||
          !validAttributes
        ) {
          return true;
        }
        break;
      default:
        return false;
    }
  }
};

export default FieldValidator;
