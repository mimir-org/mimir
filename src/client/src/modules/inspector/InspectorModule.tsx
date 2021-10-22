import { useRef } from "react";
import {
  isAnimatedModuleSelector,
  isExplorerOpenSelector,
  isInspectorOpenSelector,
  isLibOpenSelector,
  projectSelector,
  useAppDispatch,
  useAppSelector,
  useParametricAppSelector,
} from "../../redux/store";
import { Size } from "../../compLibrary";
import { MODULE_TYPE } from "../../models/project";
import { IsBlockView } from "../../components/flow/block/helpers";
import { AnimatedInspector, ResizePanel } from "./styled";
import { InspectorHeader } from ".";
import { GetSelectedNode } from "../../components/flow/helpers";
import { InspectorElement } from "./types";
import { useDragResizePanel } from "./helpers/useDragResizePanel";

/**
 * Component for the Inspector Module that shows the data for each object in Flow.
 * @returns a module with multiple tabs for different operations.
 */
const InspectorModule = () => {
  const dispatch = useAppDispatch();
  const type = MODULE_TYPE.INSPECTOR;
  const project = useAppSelector(projectSelector);
  const animate = useParametricAppSelector(isAnimatedModuleSelector, type);
  const inspectorOpen = useAppSelector(isInspectorOpenSelector);
  const libOpen = useAppSelector(isLibOpenSelector);
  const explorerOpen = useAppSelector(isExplorerOpenSelector);

  const stop = inspectorOpen ? Size.ModuleOpen : Size.ModuleClosed;
  const start = inspectorOpen ? Size.ModuleClosed : Size.ModuleOpen;

  const nodes = project?.nodes ?? [];
  const edges = project?.edges ?? [];
  const edge = edges.find((x) => x.isSelected);
  const node = IsBlockView() ? nodes?.find((x) => x.isBlockSelected) : GetSelectedNode();

  const inspectorRef = useRef(null);
  const resizePanelRef = useRef(null);

  const element: InspectorElement = node || edge;

  useDragResizePanel(inspectorRef, resizePanelRef, dispatch);
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
      <ResizePanel id="ResizePanel" ref={resizePanelRef} />
      <InspectorHeader project={project} element={element} dispatch={dispatch} open={inspectorOpen} type={type} />
    </AnimatedInspector>
  );
};

export default InspectorModule;
