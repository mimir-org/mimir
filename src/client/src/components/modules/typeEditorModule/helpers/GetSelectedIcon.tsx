import { CreateLibraryType, BlobData } from "../../../../models";

const GetSelectedIcon = (createLibraryType: CreateLibraryType, icon: BlobData[]): BlobData => {
  let selectedIcon: BlobData = icon.find((i) => i.id === createLibraryType?.symbolId);
  return selectedIcon;
};

export default GetSelectedIcon;
