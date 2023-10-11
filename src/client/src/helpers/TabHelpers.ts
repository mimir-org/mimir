import { TextResources } from "../assets/text/TextResources";
import { LibraryTab, InspectorTab } from "../models";

export const enumToTabTextResourceName = (tab: LibraryTab | InspectorTab, id: string): string => {
  const tabNameMap = {
    LibraryModule: {
      [LibraryTab.Library]: TextResources.LIBRARY,
      [LibraryTab.SubProjects]: TextResources.SUBPROJECTS,
      [LibraryTab.Templates]: TextResources.TEMPLATES,
    },
    InspectorModule: {
      [InspectorTab.Admin]: TextResources.ADMIN_INFO,
      [InspectorTab.Attributes]: TextResources.ATTRIBUTES,
      [InspectorTab.TerminalAttributes]: TextResources.TERMINAL_ATTRIBUTES,
      [InspectorTab.Relations]: TextResources.RELATIONS,
    },
  };

  return tabNameMap[id]?.[tab] || "";
};

export const activeTabEnum = (id: string) => {
  switch (id) {
    case "LibraryModule":
      return LibraryTab;
    case "InspectorModule":
      return InspectorTab;
  }
};
