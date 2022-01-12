import AspectExpandButton from "./AspectExpandButton";
import { AspectColorType, Node } from "../../../models";
import { CheckboxExplorer } from "../../../compLibrary/input/checkbox/explorer";
import { OnSelectActiveNode } from "../handlers";
import { IsCheckedTree } from "../helpers";
import { AspectElementWrapper } from "./styled";
import { Icon } from "../../../compLibrary/icon";
import {
  GetAspectColor,
  GetAspectIcon,
  IsAspectNode,
  UseIndentLevel,
  useSelectedNodes,
  UseSetSelectNodes
} from "../../../helpers";

interface Props {
  node: Node;
  nodes: Node[];
  isLeaf: boolean;
  isExpanded: boolean;
  onToggleExpanded: () => void;
  indent?: number;
}

/**
 * Component for one element in the Explorer module's TreeAspectComponent.
 * @param interface
 * @returns an element with either an Aspect header or a checkbox.
 */
const TreeAspectElement = ({ node, nodes, isLeaf, isExpanded, onToggleExpanded, indent }: Props) => {
  const [selectedNodes] = useSelectedNodes();
  const [setActiveNodeElement] = UseSetSelectNodes();

  const aspectElementContent =
    IsAspectNode(node) ?
    GetAspectHeaderContent(node) :
    GetAspectChildContent(node, nodes, selectedNodes, isExpanded, setActiveNodeElement);

  return (
    <AspectElementWrapper indent={UseIndentLevel(indent)}>
      {aspectElementContent}
      {!isLeaf && <AspectExpandButton onClick={onToggleExpanded} isExpanded={isExpanded} />}
    </AspectElementWrapper>
  );
};

export default TreeAspectElement;

const GetAspectHeaderContent = (node) => (
  <>
    <Icon size={22} src={GetAspectIcon(node)} alt="" />
    <span>{node.label}</span>
  </>
);

const GetAspectChildContent = (node, nodes, selectedNodes, expanded, setActiveNodeElement) => (
  <CheckboxExplorer
    color={GetAspectColor(node, AspectColorType.Selected)}
    isChecked={IsCheckedTree(node, selectedNodes)}
    isMiniCheckbox={false}
    isBlockView={false}
    isAspectNode={false}
    onChange={() => OnSelectActiveNode(node, nodes, selectedNodes, setActiveNodeElement)}
    label={node.label}
  />
);
