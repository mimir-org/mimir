import { TypeEditorState } from "../../../../redux/store/typeEditor/types";
import { Aspect, ObjectType } from "../../../../models";

const FieldValidator = (state: TypeEditorState, input: string) => {
  const aspect = state.createLibraryType.aspect;
  const objectType = state.createLibraryType.objectType;
  const locationType = state.createLibraryType.locationType;
  const name = state.createLibraryType.name;
  const symbol = state.createLibraryType.symbolId;

  const isFunction = aspect === Aspect.Function;
  const isLocation = aspect === Aspect.Location;

  const validAspect = aspect !== Aspect.NotSet;
  const validObjectType = isFunction && objectType !== ObjectType.NotSet;
  const validLocationType = isLocation && locationType !== "";
  const validName = name !== "";
  const validSymbol = symbol !== "";

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
    default:
      return true;
  }
};

export default FieldValidator;