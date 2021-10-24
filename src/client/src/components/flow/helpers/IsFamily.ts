import { LibItem, Node } from "../../../models";

const IsFamily = (element: Node | LibItem, elementToCheck: Node | LibItem) => {
  return element?.aspect === elementToCheck?.aspect;
};

export default IsFamily;
