import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { EyeIcon, DownIcon, UpIcon } from "../../../assets/icons/common";
import { TextResources } from "../../../assets/text";
import { InspectorTabs } from "./";
import { Size } from "../../../compLibrary";
import { MODULE_TYPE } from "../../../models/project";
import { changeModuleVisibility } from "../../../redux/store/modules/actions";
import { IsBlockView } from "../../flow/helpers/block";
import { Node, Project } from "../../../models";
import { DeleteButtonWrapper, TabsBottomLine } from "./styled";
import { DeleteNodeButton } from "./helpers";
import { removeEdge, removeNode } from "../../../redux/store/project/actions";
import {
  FindSelectedNode,
  IsExplorer,
  IsLibrary,
} from "../../flow/helpers/common";
import {
  InspectorTitle,
  InspectorBody,
  AnimatedInspector,
  IconWrapper,
  ButtonBox,
  InspectorTopMenu,
  NodeTitle,
} from "../../../compLibrary/box/inspector";
import "./inspector.scss";

const InspectorModule = () => {
  const dispatch = useDispatch();
  const key = MODULE_TYPE.INSPECTOR;

  const project = useSelector<RootState>(
    (state) => state.projectState.project
  ) as Project;

  const hasProject = project !== null;

  const animate = useSelector<RootState>(
    (state) => state.modules.types.find((x) => x.type === key).animate
  ) as boolean;

  const isInspectorOpen = useSelector<RootState>(
    (state) => state.modules.types.find((x) => x.type === key).visible
  ) as boolean;

  const isLibraryOpen = useSelector<RootState>(
    (state) => state.modules.types.find((x) => IsLibrary(x.type)).visible
  ) as boolean;

  const isExplorerOpen = useSelector<RootState>(
    (state) => state.modules.types.find((x) => IsExplorer(x.type)).visible
  ) as boolean;

  const onClick = () => {
    dispatch(changeModuleVisibility(key, !isInspectorOpen, true));
  };

  const onNodeDelete = () => {
    project.edges.forEach((e) => {
      if (e.fromNodeId === node.id) dispatch(removeEdge(e.id));
      if (e.toNodeId === node.id) dispatch(removeEdge(e.id));
    });
    dispatch(removeNode(node.id));
    dispatch(changeModuleVisibility(MODULE_TYPE.INSPECTOR, false, true));
  };

  const onEdgeDelete = () => {
    dispatch(removeEdge(edge.id));
    dispatch(changeModuleVisibility(MODULE_TYPE.INSPECTOR, false, true));
  };

  const start = isInspectorOpen ? Size.ModuleClosed : Size.InspectorModuleOpen;
  const stop = isInspectorOpen ? Size.InspectorModuleOpen : Size.ModuleClosed;

  const nodes = project?.nodes ?? [];
  const edges = project?.edges ?? [];

  let edge = edges.find((x) => x.isSelected);
  let node: Node;

  if (IsBlockView()) {
    node = nodes.find((x) => x.isBlockSelected);
  } else node = FindSelectedNode();

  const onHover = () => {
    const BORDER_SIZE = 4;
    const panel = document.getElementById("right_panel");

    let prevY;
    function resize(e) {
      const dx = prevY - e.clientX;
      prevY = e.clientX;
      panel.style.width =
        parseInt(getComputedStyle(panel, "").width) + dx + "px";
    }

    panel.addEventListener(
      "mousedown",
      function (e) {
        if (e.offsetX < BORDER_SIZE) {
          prevY = e.clientX;
          document.addEventListener("mousemove", resize, false);
        }
      },
      false
    );

    document.addEventListener(
      "mouseup",
      function () {
        document.removeEventListener("mousemove", resize, false);
      },
      false
    );
  };

  return (
    <AnimatedInspector
      type={key}
      isLibraryOpen={isLibraryOpen}
      isExplorerOpen={isExplorerOpen}
      start={start}
      stop={stop}
      run={animate}
      id="InspectorModule"
    >
      <div id="right_panel" onMouseEnter={onHover}>
        TEST
      </div>
      {/* <InspectorTopMenu id="InspectorTopMenu">
        {node && (
          <>
            <NodeTitle>{node.label ?? node.name}</NodeTitle>
            <DeleteButtonWrapper>
              <DeleteNodeButton handleClick={onNodeDelete} />
            </DeleteButtonWrapper>
          </>
        )}
        {edge && (
          <>
            <NodeTitle>{edge.id}</NodeTitle>
            <DeleteButtonWrapper>
              <DeleteNodeButton handleClick={onEdgeDelete} />
            </DeleteButtonWrapper>
          </>
        )}
        <ButtonBox>
          <img
            src={isInspectorOpen ? DownIcon : UpIcon}
            alt="toggle-icon"
            onClick={onClick}
          />
        </ButtonBox>
        <IconWrapper>
          <InspectorTitle>{TextResources.Inspector_Heading}</InspectorTitle>
          <img src={EyeIcon} alt="inspector-icon" />
        </IconWrapper>
      </InspectorTopMenu>
      <InspectorBody id="InspectorBody">
        {hasProject && <InspectorTabs project={project} node={node} />}
        <TabsBottomLine />
      </InspectorBody> */}
    </AnimatedInspector>
  );
};

export default InspectorModule;
