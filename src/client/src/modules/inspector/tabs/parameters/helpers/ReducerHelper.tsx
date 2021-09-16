import { AttributeDict } from "../redux/types";

export const RemoveEntryIfEmpty = (
  key: string,
  attributes: AttributeDict
): AttributeDict => {
  if (!attributes[key].length) {
    delete attributes[key];
  }
  return attributes;
};
