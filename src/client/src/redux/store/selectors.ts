import { Attribute, Edge, Node, Project } from "../../models";
import { MODULE_TYPE, VIEW_TYPE } from "../../models/project";
import { createAppSelector, combineAppSelectors, createParametricAppSelector } from "../../redux/store";
import { ProjectState } from "./project/types";

export const isProjectStateFetchingSelector = createAppSelector(
  (state) => state.projectState.fetching,
  (fetching) => fetching
);

export const isLibraryStateFetchingSelector = createAppSelector(
  (state) => state.library.fetching,
  (fetching) => fetching
);

export const isUserStateFetchingSelector = createAppSelector(
  (state) => state.userState.fetching,
  (fetching) => fetching
);

export const isCommonStateFetchingSelector = createAppSelector(
  (state) => state.commonState.fetching,
  (fetching) => fetching
);

export const isTypeEditorFetchingSelector = createAppSelector(
  (state) => state.typeEditor.fetching,
  (fetching) => fetching
);

export const isFetchingSelector = combineAppSelectors(
  [
    isProjectStateFetchingSelector,
    isLibraryStateFetchingSelector,
    isUserStateFetchingSelector,
    isCommonStateFetchingSelector,
    isTypeEditorFetchingSelector,
  ],
  (isProjectStateFetching, isLibraryStateFetching, isUserStateFetching, isCommonStateFetching, isTypeEditorFetching) =>
    isProjectStateFetching ||
    isLibraryStateFetching ||
    isUserStateFetching ||
    isCommonStateFetching ||
    isTypeEditorFetching
);

export const projectStateSelector = createAppSelector(
  (state) => state.projectState,
  (projectState) => projectState as ProjectState
);

export const userStateSelector = createAppSelector(
  (state) => state.userState,
  (userState) => userState
);

export const commonStateSelector = createAppSelector(
  (state) => state.commonState,
  (commonState) => commonState
);

export const typeEditorStateSelector = createAppSelector(
  (state) => state.commonState,
  (commonState) => commonState
);

export const librarySelector = createAppSelector(
  (state) => state.library,
  (library) => library
);

export const statusSelector = createAppSelector(
  (state) => state.commonState.statuses,
  (statuses) => statuses
);

export const isOpenSelector = createAppSelector(
  (state) => state.modules.types,
  (types) => !!types.find((m) => m.visible)
);

export const libOpenSelector = createAppSelector(
  (state) => state.modules.types,
  (types) => types.find((m) => m.type === MODULE_TYPE.LIBRARY).visible
);

export const inspectorOpenSelector = createAppSelector(
  (state) => state.modules.types,
  (types) => types.find((m) => m.type === MODULE_TYPE.INSPECTOR).visible
);

export const explorerOpenSelector = createAppSelector(
  (state) => state.modules.types,
  (types) => types.find((m) => m.type === MODULE_TYPE.EXPLORER).visible
);

export const legendOpenSelector = createAppSelector(
  (state) => state.modules.types,
  (types) => types.find((m) => m.type === MODULE_TYPE.LEGEND).visible
);

export const treeViewSelector = createAppSelector(
  (state) => state.flow.view,
  (view) => view === VIEW_TYPE.TREEVIEW
);

export const treeFilterSelector = createAppSelector(
  (state) => state.menu.treeFilterMenuVisibility,
  (filterMenuVisibility) => filterMenuVisibility
);

export const blockFilterSelector = createAppSelector(
  (state) => state.menu.blockFilterMenuVisibility,
  (filterMenuVisibility) => filterMenuVisibility
);

export const accountMenuOpenSelector = createAppSelector(
  (state) => state.menu.accountMenuVisibility,
  (accountMenuVisibility) => accountMenuVisibility
);

export const activeMenuSelector = createAppSelector(
  (state) => state.menu.activeMenu,
  (activeMenu) => activeMenu
);

export const isActiveMenuSelector = createParametricAppSelector(
  (state) => state.menu.activeMenu,
  (_, menuType: string) => menuType,
  (activeMenu, menuType) => activeMenu === menuType
);

export const animatedModuleSelector = createParametricAppSelector(
  (state) => state.modules.types,
  (_, type: string) => type,
  (types, type) => types.find((t) => t.type === type).animate
);

export const makeIsInspectorTabOpenSelector = () =>
  createParametricAppSelector(
    (state) => state.inspector.tabs,
    (_, index: number) => index,
    (tabs, index) => tabs[index]?.visible
  );

export const inspectorTabOpenSelector = makeIsInspectorTabOpenSelector();

export const heightSelector = createAppSelector(
  (state) => state.inspectorHeight.height,
  (height) => height
);

export const darkModeSelector = createAppSelector(
  (state) => state.darkMode.active,
  (active) => active
);

export const projectSelector = createAppSelector(
  (state) => state.projectState.project,
  (project) => project as Project
);

export const splitViewSelector = createAppSelector(
  (state) => state.splitView.visible,
  (visible) => visible
);

export const splitNodeSelector = createAppSelector(
  (state) => state.splitView.node,
  (node) => node
);

export const mainConnectSelector = createAppSelector(
  (state) => state.connectView.mainNodes,
  (mainNodes) => mainNodes
);

export const iconSelector = createAppSelector(
  (state) => state.typeEditor.icons,
  (icons) => icons
);

export const isElectroSelector = createAppSelector(
  (state) => state.electro.visible,
  (visible) => visible
);

export const edgeSelector = createAppSelector(
  (state) => state.projectState.project.edges,
  (edges) => (edges ?? []) as Edge[]
);

export const terminalTypeSelector = createAppSelector(
  (state) => state.typeEditor.terminals,
  (terminals) => terminals ?? []
);

export const nodeSelector = createAppSelector(
  (state) => state.projectState.project.nodes,
  (nodes) => (nodes ?? []) as Node[]
);

export const makeFilterSelector = () =>
  createParametricAppSelector(
    (state) => state.commonState.filters,
    (_, attributes: Attribute[]) => attributes,
    (filters, attributes) => filters.filter((x) => attributes.find((att) => att.key === x.name)) ?? []
  );
export const makeSelectedFilterSelector = () =>
  createParametricAppSelector(
    (state) => state.parametersReducer.selectedAttributeFilters,
    (_, parametersElementId: string) => parametersElementId,
    (selectedAttributeFilters, parametersElementId) => selectedAttributeFilters[parametersElementId] ?? {}
  );