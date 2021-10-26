import { useEffect } from "react";
import { Size } from "../../compLibrary";
import { MODULE_TYPE } from "../../models/project";
import { IsBlockView } from "../../components/flow/block/helpers";
import { DragResizePanel } from "./helpers";
import { AnimatedInspector, ResizePanel } from "./styled";
import { InspectorHeader } from ".";
import { GetSelectedNode } from "../../components/flow/helpers";
import { InspectorElement } from "./types";
import { useAppDispatch, useAppSelector, useParametricAppSelector } from "../../redux/store/hooks";
import { animatedModuleSelector, explorerSelector, inspectorSelector, libOpenSelector, projectSelector } from "../../redux/store";

/**
 * Component for the Inspector Module that shows the data for each object in Flow.
 * @returns a module with multiple tabs for different operations.
 */
const InspectorModule = () => {
  const dispatch = useAppDispatch();
  const type = MODULE_TYPE.INSPECTOR;
  const project = useAppSelector(projectSelector);
  const animate = useParametricAppSelector(animatedModuleSelector, type);
  const inspectorOpen = useAppSelector(inspectorSelector);
  const libOpen = useAppSelector(libOpenSelector);
  const explorerOpen = useAppSelector(explorerSelector);

  const stop = inspectorOpen ? Size.ModuleOpen : Size.ModuleClosed;
  const start = inspectorOpen ? Size.ModuleClosed : Size.ModuleOpen;

  const nodes = project?.nodes ?? [];
  const edges = project?.edges ?? [];
  const edge = edges.find((x) => x.isSelected);
  const node = IsBlockView() ? nodes?.find((x) => x.isBlockSelected) : GetSelectedNode();

  const element: InspectorElement = node || edge;

  useEffect(() => {
    DragResizePanel(dispatch);
  }, [dispatch]);

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
    >
      <ResizePanel id="ResizePanel" />
      <InspectorHeader project={project} element={element} dispatch={dispatch} open={inspectorOpen} type={type} />
    </AnimatedInspector>
  );
};

export default InspectorModule;
