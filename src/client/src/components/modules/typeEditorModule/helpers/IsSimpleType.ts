import { ObjectType } from "../../../../models";

const IsSimpleType = (object: ObjectType) => {
  return object === ObjectType.Composite;
};

export default IsSimpleType;
