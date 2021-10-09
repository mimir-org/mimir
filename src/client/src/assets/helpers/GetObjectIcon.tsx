import { LibItem, ObjectType } from "../../models";
import { LibNodeInterface, LibNodeTransport } from "../../assets/icons/";

const GetObjectIcon = (item: LibItem) => {
  if (item.libraryType === ObjectType.Interface) return LibNodeInterface;
  if (item.libraryType === ObjectType.Transport) return LibNodeTransport;

  return null;
};

export default GetObjectIcon;
