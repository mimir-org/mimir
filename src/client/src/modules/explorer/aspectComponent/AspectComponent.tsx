import { ExpandIcon, CollapseIcon } from "../../../assets/icons/chevron";
import { Node } from "../../../models";
import { AspectBox } from "../../../compLibrary/box/aspect";
import { IsBlockView, IsAspectNode, GetAspectIcon } from "../../../helpers";
import { ExplorerLine } from "./styled";
import { Elements } from "react-flow-renderer";
import { CheckboxTree } from "../../../compLibrary/checkbox/tree";
import { CheckboxBlock } from "../../../compLibrary/checkbox/block";
import { ChangeNodeDisplay } from "../helpers";
import { OnBlockChange } from "../handlers";
import { useAppDispatch } from "../../../redux/store";

interface Props {
  node: Node;
  label: string;
  indent: number;
  isLeaf: boolean;
  expanded: boolean;
  elements: Elements<any>;
  secondaryNode: Node;
  onElementExpanded: (expanded: boolean, nodeId: string) => void;
}
export const AspectComponent = ({ node, label, expanded, indent, isLeaf, elements, secondaryNode, onElementExpanded }: Props) => {
  const dispatch = useAppDispatch();

  return (
    <>
      <AspectBox indent={indent} node={node}>
        {IsAspectNode(node) && <img src={GetAspectIcon(node)} alt="aspect-icon" className="icon"></img>}
        <div className="container">
          {!IsBlockView() ? (
            <CheckboxTree node={node} label={label} onChange={ChangeNodeDisplay(node)} />
          ) : (
            <CheckboxBlock
              node={node}
              label={label}
              secondaryNode={secondaryNode}
              elements={elements}
              onChange={() => OnBlockChange(node, secondaryNode, dispatch)}
            />
          )}
        </div>

        {!isLeaf && (
          <img
            className="expandIcon"
            src={expanded ? ExpandIcon : CollapseIcon}
            alt="expand-icon"
            onClick={() => onElementExpanded(!expanded, node.id)}
          ></img>
        )}
      </AspectBox>
      <ExplorerLine node={node} />
    </>
  );
};

export default AspectComponent;
