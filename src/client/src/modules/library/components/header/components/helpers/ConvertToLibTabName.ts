import { TextResources } from "../../../../../../assets/text/TextResources";
import { LibraryTab } from "../../../../../../models";

export const ConvertToLibTabName = (tab: LibraryTab): string => {
  if (tab === LibraryTab.Library) return TextResources.MODULE_LIBRARY;
  if (tab === LibraryTab.SubProjects) return TextResources.LIBRARY_SUBPROJECTS;
  if (tab === LibraryTab.Templates) return TextResources.LIBRARY_TEMPLATES;
};
