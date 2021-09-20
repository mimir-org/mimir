import { AttributeIdDict } from "../redux/types";

export const RemoveEntryIfEmpty = (
  key: string,
  attributes: AttributeIdDict
): AttributeIdDict => {
  if (!attributes[key].length) {
    delete attributes[key];
  }
  return attributes;
};
