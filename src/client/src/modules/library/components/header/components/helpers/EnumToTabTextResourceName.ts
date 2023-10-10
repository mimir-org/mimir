import {TextResources} from "../../../../../../assets/text/TextResources";
import {LibraryTab, InspectorTab} from "../../../../../../models";

export const enumToTabTextResourceName = (tab: LibraryTab | InspectorTab, id: string): string => {
    switch (id) {
        case "LibraryModule":
            if (tab === LibraryTab.Library) return TextResources.LIBRARY;
            if (tab === LibraryTab.SubProjects) return TextResources.SUBPROJECTS;
            if (tab === LibraryTab.Templates) return TextResources.TEMPLATES;
            break;
        case "InspectorModule":
            if (tab === InspectorTab.Admin) return TextResources.ADMIN_INFO;
            if (tab === InspectorTab.Attributes) return TextResources.ATTRIBUTES;
            if (tab === InspectorTab.TerminalAttributes) return TextResources.TERMINAL_ATTRIBUTES;
            if (tab === InspectorTab.Relations) return TextResources.RELATIONS;
            break;
    }
};

export const activeTabEnum = (id: string) => {
    switch (id) {
        case "LibraryModule":
            return LibraryTab;
        case "InspectorModule":
            return InspectorTab;
    }
};