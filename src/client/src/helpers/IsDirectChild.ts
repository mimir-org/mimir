import { GetParent } from "../components/flow/helpers";

const IsDirectChild = (childId: string, parentId: string) => {
  return GetParent(childId)?.id === parentId;
};

export default IsDirectChild;
