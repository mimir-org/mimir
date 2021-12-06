import { ExpandIcon, CollapseIcon } from "../../../assets/icons/chevron";
import { AspectBox, ElementBox, ExplorerAspectLine } from "./styled";
import { VisibleComponent } from "../visibleComponent";
import { LockComponent } from "../lockComponent";
import { Node, Project } from "../../../models";
import { TreeAspectElement } from ".";
import { Dispatch } from "redux";

interface Props {
  project: Project;
  username: string;
  node: Node;
  nodes: Node[];
  indent: number;
  isLeaf: boolean;
  expanded: boolean;
  isAncestorVisible: boolean;
  isVisible: boolean;
  onElementExpanded: (expanded: boolean, nodeId: string) => void;
  onSetVisibleElement: (visible: boolean, nodeId: string) => void;
  dispatch: Dispatch;
}
export const TreeAspectComponent = ({
  project,
  username,
  node,
  nodes,
  expanded,
  indent,
  isLeaf,
  isAncestorVisible,
  isVisible,
  onSetVisibleElement,
  onElementExpanded,
  dispatch,
}: Props) => (
  <>
    <AspectBox node={node}>
      <ElementBox indent={indent}>
        <VisibleComponent
          node={node}
          isAncestorVisible={isAncestorVisible}
          isVisible={isVisible}
          onSetVisibleElement={onSetVisibleElement}
        />
        <LockComponent node={node} project={project} username={username} dispatch={dispatch} />
        <TreeAspectElement node={node} nodes={nodes} />
      </ElementBox>
      {!isLeaf && (
        <img
          className="expand-icon"
          src={expanded ? ExpandIcon : CollapseIcon}
          alt="expand-icon"
          onClick={() => onElementExpanded(!expanded, node.id)}
        ></img>
      )}
    </AspectBox>
    <ExplorerAspectLine node={node} />
  </>
);

export default TreeAspectComponent;
