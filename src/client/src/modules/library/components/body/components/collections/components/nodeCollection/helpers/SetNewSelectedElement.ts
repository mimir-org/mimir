import { LibItem } from "../../../../../../../../../models";

export const SetNewSelectedElement = (item: LibItem, setSelectedElement: (value: string) => void) => {
  setSelectedElement(item.id);
};
