import { TextResources } from "../../../assets/text";
import { LibraryTab } from "../../../models";

export const ConvertToLibTabName = (tab: LibraryTab): string => {
  if (tab === LibraryTab.Library) return TextResources.Module_Library;
  if (tab === LibraryTab.SubProjects) return TextResources.Library_SubProjects;
  if (tab === LibraryTab.Templates) return TextResources.Library_Templates;
};
