import { ExpandIcon, CollapseIcon } from "../../../assets/icons/chevron";
import { AspectBox, ElementBox, ExplorerAspectLine } from "./styled";
import { VisibleComponent } from "../visibleComponent";
import { LockComponent } from "../lockComponent";
import { Elements } from "react-flow-renderer";
import { Node } from "../../../models";
import { useAppDispatch } from "../../../redux/store";
import { IsBlockView } from "../../../helpers";
import { AspectElement } from ".";

interface Props {
  node: Node;
  nodes: Node[];
  selectedNode: Node;
  secondaryNode: Node;
  label: string;
  indent: number;
  isLeaf: boolean;
  expanded: boolean;
  elements: Elements<any>;
  isAncestorVisible: boolean;
  isVisible: boolean;
  onElementExpanded: (expanded: boolean, nodeId: string) => void;
  onSetVisibleElement: (visible: boolean, nodeId: string) => void;
}
export const AspectComponent = ({
  node,
  nodes,
  selectedNode,
  secondaryNode,
  label,
  expanded,
  indent,
  isLeaf,
  elements,
  isAncestorVisible,
  isVisible,
  onSetVisibleElement,
  onElementExpanded,
}: Props) => {
  const dispatch = useAppDispatch();
  const blockView = IsBlockView();

  return (
    <>
      <AspectBox node={node}>
        <ElementBox indent={indent}>
          {!blockView && (
            <VisibleComponent
              node={node}
              isAncestorVisible={isAncestorVisible}
              isVisible={isVisible}
              onSetVisibleElement={onSetVisibleElement}
            />
          )}
          <LockComponent node={node} />
          <AspectElement
            node={node}
            selectedNode={selectedNode}
            secondaryNode={secondaryNode}
            nodes={nodes}
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
};

export default AspectComponent;
