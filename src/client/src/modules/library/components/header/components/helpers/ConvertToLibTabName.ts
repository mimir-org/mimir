import { TextResources } from "../../../../../../assets/text/TextResources";
import { LibraryTab } from "../../../../../../models";

export const ConvertToLibTabName = (tab: LibraryTab): string => {
  if (tab === LibraryTab.Library) return TextResources.LIBRARY;
  if (tab === LibraryTab.SubProjects) return TextResources.SUBPROJECTS;
  if (tab === LibraryTab.Templates) return TextResources.TEMPLATES;
};
