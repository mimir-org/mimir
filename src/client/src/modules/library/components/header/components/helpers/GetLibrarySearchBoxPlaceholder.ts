import { TextResources } from "../../../../../../assets/text/TextResources";
import { LibraryTab } from "../../../../../../models";

export const GetLibrarySearchBoxPlaceholder = (activeTab: LibraryTab): string => {
  if (activeTab === LibraryTab.Library) return TextResources.LIBRARY_SEARCHBOX_PLACEHOLDER_LIBRARY;
  if (activeTab === LibraryTab.SubProjects) return TextResources.LIBRARY_SEARCHBOX_PLACEHOLDER_SUBPROJECTS;
  if (activeTab === LibraryTab.Templates) return TextResources.LIBRARY_SEARCHBOX_PLACEHOLDER_TEMPLATES;
};
