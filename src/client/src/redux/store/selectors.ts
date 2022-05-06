import { Node } from "../../models";
import { MODULE_TYPE } from "../../models/project";
import { AttributeLikeItem } from "../../modules/inspector/types";
import { combineAppSelectors, createAppSelector, createParametricAppSelector } from "./hooks";

export const isProjectStateFetchingSelector = createAppSelector(
  (state) => state.projectState.fetching,
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
    isProjectStateFetching || isLibraryStateFetching || isUserStateFetching || isCommonStateFetching || isTypeEditorFetching
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

export const commonStateCollaborationPartnersSelector = createAppSelector(
  (state) => state.commonState.collaborationPartners,
  (collaborationPartners) => collaborationPartners
);

export const typeEditorStateSelector = createAppSelector(
  (state) => state.typeEditor,
  (typeEditor) => typeEditor
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

export const blockElementsSelector = createAppSelector(
  (state) => state.blockElements.elements,
  (elements) => elements
);

export const nodeSizeSelector = createAppSelector(
  (state) => state.blockNodeSize.size,
  (size) => size
);

export const flowTransformSelector = createAppSelector(
  (state) => state.flowTransform,
  (flowTransform) => flowTransform
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
  (width) => width
);

export const darkModeSelector = createAppSelector(
  (state) => state.darkMode.active,
  (active) => active
);

export const location3DSelector = createAppSelector(
  (state) => state.location3D.active,
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

export const secondaryNodeSelector = createAppSelector(
  (state) => state.secondaryNode.node,
  (node) => node as Node
);

export const iconSelector = createAppSelector(
  (state) => state.typeEditor.icons,
  (icons) => icons
);

export const electroSelector = createAppSelector(
  (state) => state.electro.visible,
  (visible) => visible
);

export const edgeSelector = createAppSelector(
  (state) => state.projectState.project?.edges,
  (edges) => edges ?? []
);

export const attributeTypeSelector = createAppSelector(
  (state) => state.typeEditor.attributes,
  (attributeTypes) => attributeTypes
);

export const terminalTypeSelector = createAppSelector(
  (state) => state.typeEditor.terminals,
  (terminals) => terminals ?? []
);

export const simpleTypeSelector = createAppSelector(
  (state) => state.typeEditor.simpleTypes,
  (simpleTypes) => simpleTypes ?? []
);

export const isTypeEditorInspectorOpen = createAppSelector(
  (state) => state.typeEditor.inspector.visibility,
  (visibility) => visibility
);

export const typeEditorInspectorActiveTabSelector = createAppSelector(
  (state) => state.typeEditor.inspector.activeTabIndex,
  (activeTabIndex) => activeTabIndex
);

export const nodesSelector = createAppSelector(
  (state) => state.projectState?.project?.nodes,
  (nodes) => nodes ?? []
);

export const nodeSelector = createParametricAppSelector(
  (state) => state.projectState?.project?.nodes,
  (_, id: string) => id,
  (nodes, id) => nodes.find((n) => n.id === id)
);

export const makeFilterSelector = () =>
  createParametricAppSelector(
    (state) => state.commonState.filters,
    (_, attributes: AttributeLikeItem[]) => attributes,
    (filters, attributes) => filters.filter((x) => attributes.find((att) => att.entity === x.name)) ?? []
  );

export const makeSelectedFilterSelector = () =>
  createParametricAppSelector(
    (state) => state.parameters.selectedAttributeFilters,
    (_, parametersElementId: string) => parametersElementId,
    (selectedAttributeFilters, parametersElementId) => selectedAttributeFilters[parametersElementId] ?? {}
  );
