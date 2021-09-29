import { DownIcon, UpIcon } from "../../assets/icons/common";
import { TextResources } from "../../assets/text";
import { Edge, Node, Project } from "../../models";
import { GetInspectorColor } from "./helpers";
import { Symbol } from "../../compLibrary/symbol";
import { OnDeleteClick, OnToggleClick, OnLockClick } from "./handlers";
import { InspectorButton } from "../../compLibrary/buttons";
import { Menu, Title, NodeInfo, ToggleBox, ButtonWrapper } from "./styled";
import { InspectorTabs } from ".";

interface Props {
  project: Project;
  node: Node;
  edge: Edge;
  dispatch: any;
  open: boolean;
  type: string;
}

const InspectorHeader = ({
  project,
  node,
  edge,
  dispatch,
  open,
  type: key,
}: Props) => {
  return (
    <Menu id="InspectorBody" color={GetInspectorColor(node, edge)}>
      {project && <InspectorTabs project={project} node={node} edge={edge} />}
      <NodeInfo symbol={node?.symbol} visible={node}>
        <div className="symbol">
          <Symbol base64={node?.symbol} text={node?.label ?? node?.name} />
        </div>
        <div className="text">{node?.label ?? node?.name}</div>
        <div className="edgetext">{edge?.id}</div>
      </NodeInfo>

      <ButtonWrapper visible={node || edge}>
        <InspectorButton onClick={() => null} type="validate" visible={true} />
        <InspectorButton
          onClick={() => OnLockClick(node, project, !node.isLocked, dispatch)}
          type={node?.isLocked ? "unlock" : "lock"}
          visible={true}
        />
        <InspectorButton
          onClick={() => OnDeleteClick(project, node, edge, dispatch)}
          type="delete"
          visible={true}
        />

        <Title>{TextResources.Module_Inspector}</Title>

        <ToggleBox>
          <img
            src={open ? DownIcon : UpIcon}
            alt="toggle-icon"
            onClick={() => OnToggleClick(dispatch, key, open)}
          />
        </ToggleBox>
      </ButtonWrapper>
    </Menu>
  );
};
export default InspectorHeader;
