import { DownIcon, UpIcon } from "../../assets/icons/common";
import { TextResources } from "../../assets/text";
import { Edge, Node, Project } from "../../models";
import { GetInspectorColor } from "./helpers";
import { OnDeleteClick, OnToggleClick } from "./handlers";
import { InspectorButton } from "../../compLibrary/buttons";
import { Menu, Title, NodeInfo, ToggleBox, ButtonWrapper } from "./styled";
import { InspectorTabs } from ".";
import { Symbol } from "../../compLibrary/symbol";

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
}: Props) => (
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
      <InspectorButton onClick={() => null} type="validate" visible={false} />
      <InspectorButton onClick={() => null} type="lock" visible={false} />
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
export default InspectorHeader;
