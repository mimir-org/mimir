import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Size } from "../../compLibrary";
import { MODULE_TYPE } from "../../models/project";
import { IsBlockView } from "../../components/flow/helpers/block";
import { Node, Project } from "../../models";
import { DragResizePanel } from "./helpers";
import { AnimatedInspector } from "./styled";
import { InspectorHeader } from ".";
import { GetSelectedNode, IsExplorer, IsLibrary } from "../../components/flow/helpers/common";

const InspectorModule = () => {
  const dispatch = useDispatch();
  const type = MODULE_TYPE.INSPECTOR;
  const project = useSelector<RootState>((state) => state.projectState.project) as Project;

  const animate = useSelector<RootState>(
    (state) => state.modules.types.find((x) => x.type === type).animate
  ) as boolean;

  const isInspectorOpen = useSelector<RootState>(
    (state) => state.modules.types.find((x) => x.type === type).visible
  ) as boolean;

  const isLibraryOpen = useSelector<RootState>(
    (state) => state.modules.types.find((x) => IsLibrary(x.type)).visible
  ) as boolean;

  const isExplorerOpen = useSelector<RootState>(
    (state) => state.modules.types.find((x) => IsExplorer(x.type)).visible
  ) as boolean;

  const height = useSelector<RootState>((state) => state.inspectorHeight.height);
  console.log({ height });
  const start = isInspectorOpen ? height : Size.ModuleClosed;
  const stop = isInspectorOpen ? Size.ModuleClosed : height;

  const nodes = project?.nodes ?? [];
  const edges = project?.edges ?? [];

  let edge = edges.find((x) => x.isSelected);
  let node: Node;

  if (IsBlockView()) {
    node = nodes.find((x) => x.isBlockSelected);
  } else node = GetSelectedNode();

  useEffect(() => {
    DragResizePanel(dispatch);
  }, [dispatch]);

  return (
    <AnimatedInspector
      id="InspectorModule"
      type={type}
      isLibraryOpen={isLibraryOpen}
      isExplorerOpen={isExplorerOpen}
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
