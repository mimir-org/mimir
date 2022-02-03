import { LibraryTab } from "../../../../../models";
import { Collections, Templates } from "../../../../../assets/icons/library";

const GetCollectionIcon = (activeTab: LibraryTab) => {
  if (activeTab === LibraryTab.Library) return Collections;
  if (activeTab === LibraryTab.Templates) return Templates;
};

export default GetCollectionIcon;
