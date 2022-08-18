import * as selectors from "./helpers/selectors";
import { Dispatch } from "redux";
import { Size } from "../../assets/size/Size";
import { Tooltip } from "../../compLibrary/tooltip/Tooltip";
import { TextResources } from "../../assets/text/TextResources";
import { MODULE_TYPE } from "../../models/project";
import { InspectorElement } from "./types";
import { InspectorResizePanel } from "./InspectorModule.styled";
import { useAutoMinimizeInspector, useDragResizePanel } from "./hooks";
import { changeInspectorHeight } from "./redux/inspectorSlice";
import { setModuleVisibility } from "../../redux/store/modules/modulesSlice";
import { IsBlockView } from "../../helpers";
import { AnimatedInspector, InspectorHeader } from "./components";
import { MutableRefObject, useCallback, useRef } from "react";
import { useAppSelector, useParametricAppSelector } from "../../redux/store";
import { GetSelectedFlowNodes } from "../../helpers/Selected";
import { IsTerminal } from "../../components/flow/helpers/Connectors";
import { Terminal } from "@mimirorg/modelbuilder-types";

interface Props {
  inspectorRef: MutableRefObject<HTMLDivElement>;
  dispatch: Dispatch;
}

/**
 * Component for the Inspector Module that shows the data for each object in Mimir.
 * @param interface
 * @returns a module with multiple tabs for different operations.
 */
export const InspectorModule = ({ inspectorRef, dispatch }: Props) => {
  const type = MODULE_TYPE.INSPECTOR;
  const project = useAppSelector(selectors.projectSelector);
  const username = useAppSelector(selectors.usernameSelector);
  const animate = useParametricAppSelector(selectors.animatedModuleSelector, type);
  const activeTabIndex = useAppSelector(selectors.inspectorActiveTabSelector);
  const inspectorOpen = useAppSelector(selectors.inspectorSelector);
  const libOpen = useAppSelector(selectors.libOpenSelector);
  const explorerOpen = useAppSelector(selectors.explorerSelector);
  const isBlockView = IsBlockView();
  const selectedFlowNodes = GetSelectedFlowNodes();

  const stop = inspectorOpen ? Size.MODULE_OPEN : Size.MODULE_CLOSED;
  const start = inspectorOpen ? Size.MODULE_CLOSED : Size.MODULE_OPEN;

  const selectedEdge = project?.edges.find((e) => e.selected);
  const selectedNode = project?.nodes.find((n) => n.selected);

  const resizePanelRef = useRef(null);
  const element = (selectedNode || selectedEdge) as InspectorElement;
  const terminals = selectedNode?.connectors.filter((c) => IsTerminal(c)) as Terminal[];

  useAutoMinimizeInspector(inspectorRef, isBlockView, selectedFlowNodes);
  useDragResizePanel(inspectorRef, resizePanelRef, null, dispatch, changeInspectorHeight);

  const changeInspectorVisibilityAction = useCallback(
    (open: boolean) => setModuleVisibility({ type, visible: open, animate: true }),
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
        isBlockView={isBlockView}
        activeTabIndex={activeTabIndex}
        inspectorRef={inspectorRef}
        isInspectorOpen={inspectorOpen}
        changeInspectorVisibilityAction={changeInspectorVisibilityAction}
        changeInspectorHeightAction={changeInspectorHeight}
        selectedFlowNodes={selectedFlowNodes}
        terminals={terminals}
      />
    </AnimatedInspector>
  );
};
