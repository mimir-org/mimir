import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { InspectorTabs } from "./";
import { Size } from "../../../compLibrary";
import { MODULE_TYPE } from "../../../models/project";
import { IsBlockView } from "../../flow/helpers/block";
import { Node, Project } from "../../../models";
import { DragResizePanel } from "./helpers";
import { AnimatedInspector } from "../../../compLibrary/box/inspector";
import { InspectorHeader } from ".";
import {
  GetSelectedNode,
  IsExplorer,
  IsLibrary,
} from "../../flow/helpers/common";

const InspectorModule = () => {
  const dispatch = useDispatch();
  const type = MODULE_TYPE.INSPECTOR;

  const project = useSelector<RootState>(
    (state) => state.projectState.project
  ) as Project;

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

  const start = isInspectorOpen ? Size.ModuleClosed : Size.InspectorModuleOpen;
  const stop = isInspectorOpen ? Size.InspectorModuleOpen : Size.ModuleClosed;
  const nodes = project?.nodes ?? [];
  const edges = project?.edges ?? [];

  let edge = edges.find((x) => x.isSelected);
  let node: Node;

  if (IsBlockView()) {
    node = nodes.find((x) => x.isBlockSelected);
  } else node = GetSelectedNode();

  useEffect(() => {
    DragResizePanel();
  }, []);

  return (
    <AnimatedInspector
      type={type}
      isLibraryOpen={isLibraryOpen}
      isExplorerOpen={isExplorerOpen}
      start={start}
      stop={stop}
      run={animate}
      id="InspectorModule"
    >
      <InspectorHeader
        project={project}
        node={node}
        edge={edge}
        dispatch={dispatch}
        open={isInspectorOpen}
        type={type}
      />
      {project && <InspectorTabs project={project} node={node} />}
    </AnimatedInspector>
  );
};

export default InspectorModule;
