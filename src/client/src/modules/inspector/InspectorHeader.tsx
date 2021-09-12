import { DownIcon, UpIcon } from "../../assets/icons/common";
import { TextResources } from "../../assets/text";
import { Edge, Node, Project } from "../../models";
import { GetInspectorColor } from "./helpers";
import { ButtonWrapper } from "./styled";
import { Symbol } from "../../compLibrary/symbol";
import { OnDeleteClick, OnToggleClick } from "./handlers";
import { InspectorButton } from "../../compLibrary/buttons";
import {
  InspectorMenu,
  InspectorTitle,
  NodeInfo,
  ToggleBox,
} from "../../compLibrary/box/inspector";

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
  <InspectorMenu id="InspectorBody" color={GetInspectorColor(node, edge)}>
    <NodeInfo symbol={node?.symbol?.id} visible={node}>
      <div className="symbol">
        <Symbol base64={node?.symbol?.data} text={node?.label ?? node?.name} />
      </div>
      <div className="text">{node?.label ?? node?.name}</div>
      <div className="edgetext">{edge?.id}</div>
    </NodeInfo>

    <ButtonWrapper visible={node}>
      <InspectorButton onClick={() => null} type="validate" visible={false} />
      <InspectorButton onClick={() => null} type="lock" visible={false} />
      <InspectorButton
        onClick={() => OnDeleteClick(project, node, edge, dispatch)}
        type="delete"
        visible={true}
      />
    </ButtonWrapper>

    <ToggleBox>
      <img
        src={open ? DownIcon : UpIcon}
        alt="toggle-icon"
        onClick={() => OnToggleClick(dispatch, key, open)}
      />
    </ToggleBox>

    <InspectorTitle>{TextResources.Module_Inspector}</InspectorTitle>
  </InspectorMenu>
);
export default InspectorHeader;
