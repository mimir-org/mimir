import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { EyeIcon, DownIcon, UpIcon } from "../../../assets/icons/common";
import { TextResources } from "../../../assets/text";
import { InspectorTabs } from "./";
import { Size } from "../../../compLibrary";
import { Symbol } from "../../../compLibrary/dropdown";
import { MODULE_TYPE } from "../../../models/project";
import { changeModuleVisibility } from "../../../redux/store/modules/actions";
import { IsBlockView } from "../../flow/helpers/block";
import { Node, Project } from "../../../models";
import { DeleteButtonWrapper } from "./styled";
import { removeEdge, removeNode } from "../../../redux/store/project/actions";
import {
  DeleteNodeButton,
  GetInspectorColor,
  DragResizePanel,
  SetPanelHeight,
} from "./helpers";
import {
  FindSelectedNode,
  IsExplorer,
  IsLibrary,
} from "../../flow/helpers/common";
import {
  InspectorTitle,
  InspectorMenu,
  AnimatedInspector,
  IconWrapper,
  ButtonBox,
  NodeInfo,
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

  const onDelete = () => {
    if (node) {
      project.edges.forEach((e) => {
        if (e.fromNodeId === node.id) dispatch(removeEdge(e.id));
        if (e.toNodeId === node.id) dispatch(removeEdge(e.id));
      });
      dispatch(removeNode(node.id));
    } else dispatch(removeEdge(edge.id));

    dispatch(changeModuleVisibility(MODULE_TYPE.INSPECTOR, false, true));
    SetPanelHeight(Size.ModuleClosed);
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
    DragResizePanel();
  }, []);

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
      <InspectorMenu id="InspectorBody" color={GetInspectorColor(node, edge)}>
        {node && (
          <>
            <NodeInfo symbol={node.symbol?.id}>
              <div className="symbol">
                <Symbol
                  base64={node.symbol?.data}
                  text={node.label ?? node.name}
                />
              </div>
              <div className="text">{node.label ?? node.name}</div>
            </NodeInfo>
            <DeleteButtonWrapper>
              <DeleteNodeButton handleClick={onDelete} />
            </DeleteButtonWrapper>
          </>
        )}
        {edge && (
          <>
            <NodeInfo>
              <div className="edgetext">{edge.id}</div>
            </NodeInfo>
            <DeleteButtonWrapper>
              <DeleteNodeButton handleClick={onDelete} />
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
        {hasProject && <InspectorTabs project={project} node={node} />}
      </InspectorMenu>
    </AnimatedInspector>
  );
};

export default InspectorModule;
