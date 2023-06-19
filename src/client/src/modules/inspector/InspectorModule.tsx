import { Dispatch } from "redux";
import { Size } from "../../assets/size/Size";
import { Tooltip } from "../../compLibrary/tooltip/Tooltip";
import { TextResources } from "../../assets/text/TextResources";
import { MODULE_TYPE } from "../../models/project";
import { InspectorElement } from "./types";
import { InspectorResizePanel } from "./InspectorModule.styled";
import { useAutoMinimizeInspector, useDragResizePanel } from "./hooks";
import { AnimatedInspector, InspectorHeader } from "./components";
import { MutableRefObject, useRef, useState } from "react";
import { useAppSelector, commonStateSelector, projectStateSelector, modulesSelector } from "store";
import { ModuleType, ViewType } from "lib";
import { CommonState, setModule } from "store/reducers/commonReducer";
import { ProjectState } from "store/reducers/projectReducer";
import { useGetSelectedFlowNodes } from "hooks/useGetSelectedFlowNodes";

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
  const [activeTab, setActiveTab] = useState<number>(0);

  const type = MODULE_TYPE.INSPECTOR;
  const projectState = useAppSelector<ProjectState>(projectStateSelector);
  const commonState = useAppSelector<CommonState>(commonStateSelector);

  const selectedFlowNodes = useGetSelectedFlowNodes();

  const selectedEdge = projectState.project.getSelectedConnection();
  const selectedNode = projectState.project.getSelectedAspectObject();

  const resizePanelRef = useRef(null);
  const element = (selectedNode || selectedEdge) as InspectorElement;

  useAutoMinimizeInspector(inspectorRef, commonState?.view === ViewType.Block, selectedFlowNodes);
  const modules = useAppSelector<ModuleType[]>(modulesSelector);
  const open = modules.some((x) => x === ModuleType.Inspector);

  // useDragResizePanel(inspectorRef, resizePanelRef, null, dispatch, changeInspectorHeight);

  // const changeInspectorVisibilityAction = useCallback(
  //   (open: boolean) => setModuleVisibility({ type, visible: open, animate: true }),
  //   [type]
  // );

  return (
    <AnimatedInspector
      id="InspectorModule"
      type={type}
      isLibraryOpen={false}
      isExplorerOpen={false}
      isInspectorOpen={open}
      start={open ? Size.MODULE_CLOSED : Size.MODULE_OPEN}
      stop={open ? Size.MODULE_OPEN : Size.MODULE_CLOSED}
      run={true}
      zIndex={5}
      forwardRef={inspectorRef}
    >
      <Tooltip content={TextResources.RESIZE} offset={[0, 10]} delay={150}>
        <InspectorResizePanel tabIndex={0} id="ResizePanel" ref={resizePanelRef} isInspectorOpen={open} />
      </Tooltip>
      <InspectorHeader
        project={projectState.project}
        element={element}
        username={commonState?.user?.email ?? ""}
        dispatch={dispatch}
        open={open}
        isBlockView={commonState?.view === ViewType.Block}
        activeTabIndex={activeTab}
        inspectorRef={inspectorRef}
        isInspectorOpen={open}
        changeInspectorVisibilityAction={() => setModule({ module: ModuleType.Inspector, open: !open })}
        changeInspectorHeightAction={null}
        selectedFlowNodes={selectedFlowNodes}
      />
    </AnimatedInspector>
  );
};
