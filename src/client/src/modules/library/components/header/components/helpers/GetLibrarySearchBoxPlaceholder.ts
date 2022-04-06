import { TextResources } from "../../../../../../assets/text/TextResources";
import { LibraryTab } from "../../../../../../models";

export const GetLibrarySearchBoxPlaceholder = (activeTab: LibraryTab): string => {
  if (activeTab === LibraryTab.Library) return TextResources.SEARCHBOX_LIB;
  if (activeTab === LibraryTab.SubProjects) return TextResources.SEARCHBOX_SUBPROJECTS;
  if (activeTab === LibraryTab.Templates) return TextResources.SEARCHBOX_TEMPLATES;
};
