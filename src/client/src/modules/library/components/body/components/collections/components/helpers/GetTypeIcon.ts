import { BlobData } from "../../../../../../../../models";
import red from "../../../../../../../../redux/store";

export const GetTypeIcon = (itemId: string): BlobData => {
  const icons = red.store.getState().typeEditor.icons;
  return icons?.find((i) => i.id === itemId) ?? null;
};
