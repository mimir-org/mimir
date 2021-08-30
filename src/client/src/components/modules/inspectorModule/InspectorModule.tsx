import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { EyeIcon, DownIcon, UpIcon } from "../../../assets/icons/common";
import { TextResources } from "../../../assets/text";
import { InspectorTabs } from "./";
import { Color, Size } from "../../../compLibrary";
import { Symbol } from "../../../compLibrary/dropdown";
import { MODULE_TYPE } from "../../../models/project";
import { changeModuleVisibility } from "../../../redux/store/modules/actions";
import { IsBlockView } from "../../flow/helpers/block";
import { Node, Project } from "../../../models";
import { DeleteButtonWrapper, TabsBottomLine } from "./styled";
import { DeleteNodeButton, ResizePanel } from "./helpers";
import { removeEdge, removeNode } from "../../../redux/store/project/actions";
import {
  FindSelectedNode,
  IsExplorer,
  IsFunction,
  IsLibrary,
  IsLocation,
  IsProduct,
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

  useEffect(() => {
    ResizePanel();
  }, []);

  const getColor = () => {
    if (IsFunction(node)) return Color.FunctionTransparent;
    else if (IsLocation(node)) return Color.LocationTransparent;
    else if (IsProduct(node)) return Color.ProductTransparent;
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
      <InspectorTopMenu id="InspectorTopMenu" color={getColor()}>
        {node && (
          <>
            <NodeTitle>
              <Symbol
                base64={node.symbol?.data}
                text={node.label ?? node.name}
              />
              <div className="text">{node.label ?? node.name}</div>
            </NodeTitle>
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
      <InspectorBody id="InspectorBody" color={getColor()}>
        {hasProject && <InspectorTabs project={project} node={node} />}
        <TabsBottomLine />
      </InspectorBody>
    </AnimatedInspector>
  );
};

export default InspectorModule;
