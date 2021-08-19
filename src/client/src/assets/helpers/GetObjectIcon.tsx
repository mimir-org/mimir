import { LibItem, ObjectType } from "../../models";
import {
  LibNodeInterface,
  LibNodeTransport,
  LocationIcon,
} from "../../assets/icons/common";

const GetObjectIcon = (item: LibItem) => {
  if (item.libraryType === ObjectType.Interface) return LibNodeInterface;
  if (item.libraryType === ObjectType.Transport) return LibNodeTransport;

  return LocationIcon;
};

export default GetObjectIcon;
