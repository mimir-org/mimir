import * as Click from "./handlers";
import { DownIcon, UpIcon } from "../../assets/icons/common";
import { TextResources } from "../../assets/text";
import { Edge, Node, Project } from "../../models";
import { GetInspectorColor } from "./helpers";
import { Symbol } from "../../compLibrary/symbol";
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

const InspectorHeader = ({ project, node, edge, dispatch, open, type }: Props) => (
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
      <InspectorButton onClick={() => alert("Arjun er søt")} type="validate" visible={true} />
      <InspectorButton
        onClick={() => Click.OnLock(node, project, !node.isLocked, dispatch)}
        type={node?.isLocked ? "unlock" : "lock"}
        visible={true}
      />
      <InspectorButton onClick={() => Click.OnDelete(project, node, edge, dispatch)} type="delete" visible={true} />

      <Title onClick={() => Click.OnToggle(dispatch, type, open)}>{TextResources.Module_Inspector}</Title>
      <ToggleBox>
        <img src={open ? DownIcon : UpIcon} alt="toggle-icon" onClick={() => Click.OnToggle(dispatch, type, open)} />
      </ToggleBox>
    </ButtonWrapper>
  </Menu>
);
export default InspectorHeader;
