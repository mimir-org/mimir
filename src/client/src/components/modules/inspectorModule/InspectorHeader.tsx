import { DownIcon, UpIcon } from "../../../assets/icons/common";
import { TextResources } from "../../../assets/text";
import { Edge, Node, Project } from "../../../models";
import { DeleteNodeButton, GetInspectorColor, SetPanelHeight } from "./helpers";
import { DeleteButtonWrapper } from "./styled";
import { Symbol } from "../../../compLibrary/dropdown";
import { Size } from "../../../compLibrary";
import { MODULE_TYPE } from "../../../models/project";
import { removeEdge, removeNode } from "../../../redux/store/project/actions";
import { setModuleVisibility } from "../../../redux/store/modules/actions";
import {
  IconWrapper,
  InspectorMenu,
  InspectorTitle,
  NodeInfo,
  ToggleBox,
} from "../../../compLibrary/box/inspector";

interface Props {
  project: Project;
  node: Node;
  edge: Edge;
  dispatch: any;
  open: boolean;
}

const InspectorHeader = ({ project, node, edge, dispatch, open }: Props) => {
  const key = MODULE_TYPE.INSPECTOR;

  const onToggleClick = () => {
    dispatch(setModuleVisibility(key, !open, true));
    const panel = document.getElementById("InspectorModule");

    if (panel.style.height === Size.ModuleClosed + "px")
      SetPanelHeight(Size.InspectorModuleOpen);
    else SetPanelHeight(Size.ModuleClosed);
  };

  const onDelete = () => {
    if (node) {
      project.edges.forEach((e) => {
        if (e.fromNodeId === node.id) dispatch(removeEdge(e.id));
        if (e.toNodeId === node.id) dispatch(removeEdge(e.id));
      });
      dispatch(removeNode(node.id));
    } else dispatch(removeEdge(edge.id));

    dispatch(setModuleVisibility(MODULE_TYPE.INSPECTOR, false, true));
    SetPanelHeight(Size.ModuleClosed);
  };

  return (
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

      <ToggleBox>
        <img
          src={open ? DownIcon : UpIcon}
          alt="toggle-icon"
          onClick={onToggleClick}
        />
      </ToggleBox>
      <IconWrapper>
        <InspectorTitle>{TextResources.Inspector_Heading}</InspectorTitle>
      </IconWrapper>
    </InspectorMenu>
  );
};

export default InspectorHeader;
