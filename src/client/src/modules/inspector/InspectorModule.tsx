import * as selectors from "./helpers/selectors";
import { Dispatch } from "redux";
import { Size } from "../../compLibrary/size/Size";
import { Tooltip } from "../../compLibrary/tooltip/Tooltip";
import { TextResources } from "../../assets/text/TextResources";
import { MODULE_TYPE } from "../../models/project";
import { InspectorElement } from "./types";
import { InspectorResizePanel } from "./InspectorModule.styled";
import { Project } from "../../models";
import { useAutoMinimizeInspector, useDragResizePanel } from "./hooks";
import { changeInspectorHeight } from "./redux/inspectorSlice";
import { setModuleVisibility } from "../../redux/store/modules/modulesSlice";
import { IsBlockView } from "../../helpers";
import { AnimatedInspector, InspectorHeader } from "./components";
import { MutableRefObject, useCallback, useRef } from "react";
import { useAppSelector, useParametricAppSelector } from "../../redux/store";

interface Props {
  project: Project;
  inspectorRef: MutableRefObject<HTMLDivElement>;
  dispatch: Dispatch;
}

/**
 * Component for the Inspector Module that shows the data for each object in Mimir.
 * @param interface
 * @returns a module with multiple tabs for different operations.
 */
export const InspectorModule = ({ project, inspectorRef, dispatch }: Props) => {
  const type = MODULE_TYPE.INSPECTOR;
  const username = useAppSelector(selectors.usernameSelector);
  const animate = useParametricAppSelector(selectors.animatedModuleSelector, type);
  const activeTabIndex = useAppSelector(selectors.inspectorActiveTabSelector);
  const inspectorOpen = useAppSelector(selectors.inspectorSelector);
  const libOpen = useAppSelector(selectors.libOpenSelector);
  const explorerOpen = useAppSelector(selectors.explorerSelector);

  const stop = inspectorOpen ? Size.MODULE_OPEN : Size.MODULE_CLOSED;
  const start = inspectorOpen ? Size.MODULE_CLOSED : Size.MODULE_OPEN;

  const nodes = project?.nodes ?? [];
  const edges = project?.edges ?? [];
  const edge = edges.find((x) => x.selected);
  const node = nodes.find((x) => (IsBlockView() ? x.blockSelected : x.selected));

  const resizePanelRef = useRef(null);
  const element: InspectorElement = node || edge;

  useAutoMinimizeInspector(inspectorRef);
  useDragResizePanel(inspectorRef, resizePanelRef, null, dispatch, changeInspectorHeight);

  const inspectorVisibilityAction = useCallback(
    (open: boolean) => setModuleVisibility({ type: type, visible: open, animate: true }),
    [type]
  );

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
      <Tooltip content={TextResources.RESIZE} offset={[0, 10]} delay={150}>
        <InspectorResizePanel tabIndex={0} id="ResizePanel" ref={resizePanelRef} isInspectorOpen={inspectorOpen} />
      </Tooltip>
      <InspectorHeader
        project={project}
        element={element}
        username={username}
        dispatch={dispatch}
        open={inspectorOpen}
        activeTabIndex={activeTabIndex}
        inspectorRef={inspectorRef}
        isInspectorOpen={inspectorOpen}
        inspectorVisibilityAction={inspectorVisibilityAction}
        inspectorHeightAction={changeInspectorHeight}
      />
    </AnimatedInspector>
  );
};
