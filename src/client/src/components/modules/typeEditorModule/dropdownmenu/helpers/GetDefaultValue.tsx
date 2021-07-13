import { Aspect, ObjectType, Status } from "../../../../../models";

const GetDefaultValue = (type: Aspect | ObjectType | Status) => {
  if (type === Aspect.NotSet) return "Select Aspect";
  if (type === Status.NotSet) return "Not set";
  if (type === ObjectType.NotSet) return "Select Object Type";
};

export default GetDefaultValue;
