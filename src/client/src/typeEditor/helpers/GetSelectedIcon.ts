import { BlobData, CreateLibraryType } from "../../models";

const GetSelectedIcon = (createLibraryType: CreateLibraryType, icon: BlobData[]): BlobData => {
  const selectedIcon: BlobData = icon.find((i) => i.data === createLibraryType?.symbolId);
  return selectedIcon;
};

export default GetSelectedIcon;
