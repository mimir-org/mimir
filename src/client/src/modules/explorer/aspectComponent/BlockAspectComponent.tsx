import { ExpandIcon, CollapseIcon } from "../../../assets/icons/chevron";
import { AspectBox, ElementBox, ExplorerAspectLine } from "./styled";
import { LockComponent } from "../lockComponent";
import { Elements } from "react-flow-renderer";
import { Node } from "../../../models";
import { BlockAspectElement } from ".";
import { SetBlockNodeIndent } from "./helpers";

interface Props {
  node: Node;
  selectedNode: Node;
  secondaryNode: Node;
  label: string;
  indent: number;
  isLeaf: boolean;
  expanded: boolean;
  elements: Elements<any>;
  dispatch: any;
  onElementExpanded: (expanded: boolean, nodeId: string) => void;
}
export const BlockAspectComponent = ({
  node,
  selectedNode,
  secondaryNode,
  label,
  expanded,
  indent,
  isLeaf,
  elements,
  dispatch,
  onElementExpanded,
}: Props) => (
  <>
    <AspectBox node={node}>
      <ElementBox indent={SetBlockNodeIndent(node, indent)}>
        <LockComponent node={node} />
        <BlockAspectElement
          node={node}
          selectedNode={selectedNode}
          secondaryNode={secondaryNode}
          elements={elements}
          label={label}
          dispatch={dispatch}
        />
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

export default BlockAspectComponent;
