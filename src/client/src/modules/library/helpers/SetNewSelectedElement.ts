/* eslint-disable @typescript-eslint/no-explicit-any */
import { LibItem } from "../../../models";

const SetNewSelectedElement = (item: LibItem, setSelectedElement: any) => {
  setSelectedElement(item.id);
};

export default SetNewSelectedElement;
