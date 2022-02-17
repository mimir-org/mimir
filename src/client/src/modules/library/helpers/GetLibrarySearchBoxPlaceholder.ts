import { TextResources } from "../../../assets/text";
import { LibraryTab } from "../../../models";

export const GetLibrarySearchBoxPlaceholder = (activeTab: LibraryTab): string => {
  if (activeTab === LibraryTab.Library) return TextResources.Library_SearchBox_Placeholder_Library;
  if (activeTab === LibraryTab.SubProjects) return TextResources.Library_SearchBox_Placeholder_Subprojects;
  if (activeTab === LibraryTab.Templates) return TextResources.Library_SearchBox_Placeholder_Templates;
};
