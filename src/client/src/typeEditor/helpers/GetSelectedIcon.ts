import { BlobData, CreateLibraryType } from "../../models";

const GetSelectedIcon = (createLibraryType: CreateLibraryType, icon: BlobData[]): BlobData => {
  const selectedIcon: BlobData = icon.find((i) => i.id === createLibraryType?.symbolId);
  return selectedIcon;
};

export default GetSelectedIcon;
