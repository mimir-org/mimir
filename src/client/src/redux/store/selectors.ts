import { AspectObject } from "../../lib/classes";
import { MODULE_TYPE } from "../../models/project";
import { combineAppSelectors, createAppSelector, createParametricAppSelector } from "./hooks";

export const isProjectStateFetchingSelector = createAppSelector(
  (state) => state.projectState.fetching?.length > 0,
  (fetching) => fetching
);

export const isProjectStateGloballyLockingSelector = createAppSelector(
  (state) => state.projectState.isLocking,
  (isLocking) => isLocking
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

export const isFetchingSelector = combineAppSelectors(
  [isProjectStateFetchingSelector, isLibraryStateFetchingSelector, isUserStateFetchingSelector, isCommonStateFetchingSelector],
  (isProjectStateFetching, isLibraryStateFetching, isUserStateFetching, isCommonStateFetching) =>
    isProjectStateFetching || isLibraryStateFetching || isUserStateFetching || isCommonStateFetching
);

export const projectStateSelector = createAppSelector(
  (state) => state.projectState,
  (projectState) => projectState
);

export const projectNameSelector = createAppSelector(
  (state) => state.projectState?.project?.name,
  (name) => name
);

export const userStateSelector = createAppSelector(
  (state) => state.userState,
  (userState) => userState
);

export const usernameSelector = createAppSelector(
  (state) => state.userState.user?.name,
  (username) => username
);

export const commonStateSelector = createAppSelector(
  (state) => state.commonState,
  (commonState) => commonState
);

export const commonStateParsersSelector = createAppSelector(
  (state) => state.commonState.parsers,
  (parsers) => parsers
);

export const commonStateCompaniesSelector = createAppSelector(
  (state) => state.commonState.companies,
  (companies) => companies
);

export const commonStateCompanySelector = createAppSelector(
  (state) => state.commonState.company,
  (company) => company
);

export const librarySelector = createAppSelector(
  (state) => state.library,
  (library) => library
);

export const terminalsSelector = createAppSelector(
  (state) => state.library.terminals,
  (terminals) => terminals
);

export const libraryAttributeTypeSelector = createAppSelector(
  (state) => state.library.attributeTypes,
  (attributes) => attributes
);

export const libNodesSelector = createAppSelector(
  (state) => state.library.libNodes,
  (nodes) => nodes
);

export const libSubProjectorSelector = createAppSelector(
  (state) => state.library.subProjects,
  (subProjects) => subProjects
);

export const qunatityDatumSelector = createAppSelector(
  (state) => state.library.quantityDatums,
  (quantityDatums) => quantityDatums
);

export const isOpenSelector = createAppSelector(
  (state) => state.modules.types,
  (types) => !!types.find((m) => m.visible)
);

export const libOpenSelector = createAppSelector(
  (state) => state.modules.types,
  (types) => types.find((m) => m.type === MODULE_TYPE.LIBRARY).visible
);

export const inspectorSelector = createAppSelector(
  (state) => state.modules.types,
  (types) => types.find((m) => m.type === MODULE_TYPE.INSPECTOR).visible
);

export const explorerSelector = createAppSelector(
  (state) => state.modules.types,
  (types) => types.find((m) => m.type === MODULE_TYPE.EXPLORER).visible
);

export const legendOpenSelector = createAppSelector(
  (state) => state.modules.types,
  (types) => types.find((m) => m.type === MODULE_TYPE.LEGEND).visible
);

export const animatedEdgeSelector = createAppSelector(
  (state) => state.edgeAnimation.animated,
  (animated) => animated
);

export const customCategorySelector = createAppSelector(
  (state) => state.customCategory,
  (customCategory) => customCategory
);

export const nodeSizeSelector = createAppSelector(
  (state) => state.blockNodeSize.size,
  (size) => size
);

export const flowViewSelector = createAppSelector(
  (state) => state.flow.view,
  (view) => view
);

export const isActiveViewSelector = createParametricAppSelector(
  (state) => state.flow.view,
  (_, viewType: string) => viewType,
  (activeView, menuType) => activeView === menuType
);

export const validationSelector = createAppSelector(
  (state) => state.validation,
  (validation) => validation
);

export const filterSelector = createAppSelector(
  (state) => state.menu.filterMenuVisibility,
  (filterMenuVisibility) => filterMenuVisibility
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

export const inspectorActiveTabSelector = createAppSelector(
  (state) => state.inspector.tabs,
  (tabs) => tabs.indexOf(tabs.find((t) => t.visible))
);

export const heightSelector = createAppSelector(
  (state) => state.inspector.height,
  (width) => width // TODO: ?
);

export const darkModeSelector = createAppSelector(
  (state) => state.darkMode.active,
  (active) => active
);

export const projectSelector = createAppSelector(
  (state) => state.projectState.project,
  (project) => project
);

export const projectIdSelector = createAppSelector(
  (state) => state.projectState?.project?.id,
  (projectId) => projectId
);

export const projectListSelector = createAppSelector(
  (state) => state.projectState.projectList,
  (projectList) => projectList
);

export const projectIsSubProjectSelector = createAppSelector(
  (state) => state.projectState?.project?.isSubProject,
  (isSubProject) => isSubProject
);

export const selectedNodeSelector = createAppSelector(
  (state) => state.projectState.project.aspectObjects?.find((n: AspectObject) => n.selected),
  (node) => node
);

// export const electroViewSelector = createAppSelector(
//   (state) => state.electro.visible,
//   (visible) => visible
// );

export const nodesSelector = createAppSelector(
  (state) => state.projectState?.project?.aspectObjects,
  (nodes) => nodes ?? []
);

export const edgesSelector = createAppSelector(
  (state) => state.projectState?.project?.connections,
  (edges) => edges ?? []
);

export const nodeSelector = createParametricAppSelector(
  (state) => state.projectState?.project?.aspectObjects,
  (_, id: string) => id,
  (nodes, id) => nodes.find((n: AspectObject) => n.id === id)
);
