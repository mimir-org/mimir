/* eslint-disable @typescript-eslint/no-explicit-any */
import { LibItem } from "../../../../../../../../../models";

export const SetNewSelectedElement = (item: LibItem, setSelectedElement: any) => {
  setSelectedElement(item.id);
};
