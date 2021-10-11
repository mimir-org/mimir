import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Size } from "../../compLibrary";
import { MODULE_TYPE } from "../../models/project";
import { IsBlockView } from "../../components/flow/block/helpers";
import { Project } from "../../models";
import { DragResizePanel } from "./helpers";
import { AnimatedInspector } from "./styled";
import { InspectorHeader } from ".";
import { GetSelectedNode, IsExplorer, IsLibrary } from "../../components/flow/helpers";

/**
 * Component for the Inspector Module that shows the data for each object in Flow.
 * @returns a module with multiple tabs for different operations.
 */
const InspectorModule = () => {
  const dispatch = useDispatch();
  const type = MODULE_TYPE.INSPECTOR;
  const project = useSelector<RootState>((s) => s.projectState.project) as Project;
  const animate = useSelector<RootState>((s) => s.modules.types.find((x) => x.type === type).animate) as boolean;
  const isInspectorOpen = useSelector<RootState>((s) => s.modules.types.find((x) => x.type === type).visible) as boolean;
  const isLibraryOpen = useSelector<RootState>((s) => s.modules.types.find((x) => IsLibrary(x.type)).visible) as boolean;
  const isExplorerOpen = useSelector<RootState>(
    (s) => s.modules.types.find((x) => IsExplorer(x.type)).visible
  ) as boolean;

  const stop = isInspectorOpen ? Size.ModuleOpen : Size.ModuleClosed;
  const start = isInspectorOpen ? Size.ModuleClosed : Size.ModuleOpen;

  const nodes = project?.nodes ?? [];
  const edges = project?.edges ?? [];
  const edge = edges.find((x) => x.isSelected);
  const node = IsBlockView() ? nodes?.find((x) => x.isBlockSelected) : GetSelectedNode();

  useEffect(() => {
    DragResizePanel(dispatch);
  }, [dispatch]);

  return (
    <AnimatedInspector
      id="InspectorModule"
      type={type}
      isLibraryOpen={isLibraryOpen}
      isExplorerOpen={isExplorerOpen}
      isInspectorOpen={isInspectorOpen}
      start={start}
      stop={stop}
      run={animate}
    >
      <InspectorHeader
        project={project}
        node={node}
        edge={edge}
        dispatch={dispatch}
        open={isInspectorOpen}
        type={type}
      />
    </AnimatedInspector>
  );
};

export default InspectorModule;
