import { TypeEditorState } from "../../../../redux/store/typeEditor/types";
import { Aspect, ObjectType } from "../../../../models";
import {
  IsFunction,
  IsLocation,
  IsObjectBlock,
  IsTransport,
  IsInterface,
  ModeEdit,
  ModeNew,
} from ".";

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
  const terminalTypeId = state.createLibraryType.terminalTypeId;

  const validAspect = aspect !== Aspect.NotSet;
  const validObjectType = objectType !== ObjectType.NotSet;
  const validLocationType = locationType !== "";
  const validName = name !== "";
  const validSymbol = symbol !== "";
  const validRds = rds !== "";
  const validTerminals = terminals.length !== 0;
  const validPredefinedAttributes = predefinedAttributes.length !== 0;
  const validAttributes = attributes.length !== 0;
  const validTerminalTypeId = terminalTypeId !== "";

  if (ModeEdit(state.mode)) {
    return false;
  } else if (ModeNew(state.mode)) {
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
        if (!validAspect || (!validObjectType && !validLocationType)) {
          return true;
        }
        if (IsFunction(aspect) && IsObjectBlock(objectType)) {
          if (
            validName &&
            validSymbol &&
            validRds &&
            validTerminals &&
            validAttributes
          ) {
            return false;
          }
        } else if (IsFunction(aspect) && IsTransport(objectType)) {
          if (
            validName &&
            validSymbol &&
            validRds &&
            validTerminalTypeId &&
            validAttributes
          ) {
            return false;
          }
        } else if (IsFunction(aspect) && IsInterface(objectType)) {
          if (validName && validSymbol && validRds && validTerminalTypeId) {
            return false;
          }
        } else if (IsLocation(aspect)) {
          return !(
            validLocationType &&
            validName &&
            validSymbol &&
            validRds &&
            validPredefinedAttributes &&
            validAttributes
          );
        }
        break;
      default:
        return true;
    }
  }
};

export default FieldValidator;
