import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Size } from "../../compLibrary";
import { MODULE_TYPE } from "../../models/project";
import { IsBlockView } from "../../components/flow/block/helpers";
import { Node, Project } from "../../models";
import { DragResizePanel } from "./helpers";
import { AnimatedInspector } from "./styled";
import { InspectorHeader } from ".";
import { GetSelectedNode, IsExplorer, IsLibrary } from "../../components/flow/helpers";

const InspectorModule = () => {
  const dispatch = useDispatch();
  const type = MODULE_TYPE.INSPECTOR;
  const project = useSelector<RootState>((s) => s.projectState.project) as Project;
  const animate = useSelector<RootState>((s) => s.modules.types.find((x) => x.type === type).animate) as boolean;
  const inspectorOpen = useSelector<RootState>((s) => s.modules.types.find((x) => x.type === type).visible) as boolean;
  const libraryOpen = useSelector<RootState>((s) => s.modules.types.find((x) => IsLibrary(x.type)).visible) as boolean;
  const explorerOpen = useSelector<RootState>((s) => s.modules.types.find((x) => IsExplorer(x.type)).visible) as boolean;
  const height = (useSelector<RootState>((s) => s.inspectorHeight.height) as number) ?? Size.ModuleOpen;

  const stop = inspectorOpen ? height : Size.ModuleClosed;
  const start = inspectorOpen ? Size.ModuleClosed : height;

  const nodes = project?.nodes ?? [];
  const edges = project?.edges ?? [];

  let edge = edges.find((x) => x.isSelected);
  let node: Node;

  if (IsBlockView()) {
    node = nodes.find((x) => x.isBlockSelected);
  } else node = GetSelectedNode();

  useEffect(() => {
    if (inspectorOpen) DragResizePanel(inspectorOpen);
  }, [inspectorOpen]);

  return (
    <AnimatedInspector
      id="InspectorModule"
      type={type}
      isLibraryOpen={libraryOpen}
      isExplorerOpen={explorerOpen}
      start={start}
      stop={stop}
      run={animate}
      height={height}
    >
      <InspectorHeader
        project={project}
        node={node}
        edge={edge}
        dispatch={dispatch}
        open={inspectorOpen}
        type={type}
        height={height}
      />
    </AnimatedInspector>
  );
};

export default InspectorModule;
