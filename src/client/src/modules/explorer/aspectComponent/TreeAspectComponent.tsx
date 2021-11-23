import { ExpandIcon, CollapseIcon } from "../../../assets/icons/chevron";
import { AspectBox, ElementBox, ExplorerAspectLine } from "./styled";
import { VisibleComponent } from "../visibleComponent";
import { LockComponent } from "../lockComponent";
import { Node } from "../../../models";
import { TreeAspectElement } from ".";

interface Props {
  node: Node;
  nodes: Node[];
  label: string;
  indent: number;
  isLeaf: boolean;
  expanded: boolean;
  isAncestorVisible: boolean;
  isVisible: boolean;
  onElementExpanded: (expanded: boolean, nodeId: string) => void;
  onSetVisibleElement: (visible: boolean, nodeId: string) => void;
}
export const TreeAspectComponent = ({
  node,
  nodes,
  label,
  expanded,
  indent,
  isLeaf,
  isAncestorVisible,
  isVisible,
  onSetVisibleElement,
  onElementExpanded,
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
        <LockComponent node={node} />
        <TreeAspectElement node={node} nodes={nodes} label={label} />
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
