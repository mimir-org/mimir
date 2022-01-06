import * as selectors from "./helpers/selectors";
import { Dispatch } from "redux";
import { Size } from "../../compLibrary/size";
import { MODULE_TYPE } from "../../models/project";
import { IsBlockView, GetSelectedNode } from "../../helpers";
import { AnimatedInspector, ResizePanel } from "./styled";
import { InspectorHeader } from ".";
import { InspectorElement } from "./types";
import { useDragResizePanel } from "./helpers";
import { changeInspectorHeight } from "./redux/inspectorSlice";
import { setModuleVisibility } from "../../redux/store/modules/modulesSlice";
import { useCallback, useRef } from "react";
import { useAppSelector, useParametricAppSelector } from "../../redux/store";
import { Project } from "../../models";

interface Props {
  project: Project;
  inspectorRef: React.MutableRefObject<HTMLDivElement>;
  dispatch: Dispatch;
}

/**
 * Component for the Inspector Module that shows the data for each object in Flow.
 * @param interface
 * @returns a module with multiple tabs for different operations.
 */
const InspectorModule = ({ project, inspectorRef, dispatch }: Props) => {
  const type = MODULE_TYPE.INSPECTOR;
  const username = useAppSelector(selectors.usernameSelector);
  const animate = useParametricAppSelector(selectors.animatedModuleSelector, type);
  const activeTabIndex = useAppSelector(selectors.inspectorActiveTabSelector);
  const inspectorOpen = useAppSelector(selectors.inspectorSelector);
  const libOpen = useAppSelector(selectors.libOpenSelector);
  const explorerOpen = useAppSelector(selectors.explorerSelector);

  const stop = inspectorOpen ? Size.ModuleOpen : Size.ModuleClosed;
  const start = inspectorOpen ? Size.ModuleClosed : Size.ModuleOpen;

  const nodes = project?.nodes ?? [];
  const edges = project?.edges ?? [];
  const edge = edges.find((x) => x.isSelected);
  const node = IsBlockView() ? nodes?.find((x) => x.isBlockSelected) : GetSelectedNode();

  const resizePanelRef = useRef(null);
  const element: InspectorElement = node || edge;

  useDragResizePanel(inspectorRef, resizePanelRef, null, dispatch, changeInspectorHeight);
  const changeInspectorVisibilityAction = useCallback((open: boolean) => setModuleVisibility({type: type, visible: open, animate: true}), [type]);

  return (
    <AnimatedInspector
      id="InspectorModule"
      type={type}
      isLibraryOpen={libOpen}
      isExplorerOpen={explorerOpen}
      isInspectorOpen={inspectorOpen}
      start={start}
      stop={stop}
      run={animate}
      zIndex={5}
      forwardRef={inspectorRef}
    >
      <ResizePanel id="ResizePanel" ref={resizePanelRef} isInspectorOpen={inspectorOpen} />
      <InspectorHeader
        project={project}
        element={element}
        username={username}
        dispatch={dispatch}
        open={inspectorOpen}
        activeTabIndex={activeTabIndex}
        inspectorRef={inspectorRef}
        isInspectorOpen={inspectorOpen}
        changeInspectorVisibilityAction={changeInspectorVisibilityAction}
        changeInspectorHeightAction={changeInspectorHeight}
      />
    </AnimatedInspector>
  );
};

export default InspectorModule;
