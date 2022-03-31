import { AspectExpandButton } from "../../shared/components/AspectExpandButton";
import { AspectColorType, Node } from "../../../../../models";
import { CheckboxExplorer } from "../../../../../compLibrary/input/checkbox/explorer/CheckboxExplorer";
import { OnSelectActiveNode } from "./handlers/OnSelectActiveNode";
import { IsCheckedTree } from "./helpers/IsCheckedTree";
import { AspectElementWrapper } from "../../shared/styled/AspectElementWrapper";
import { Icon } from "../../../../../compLibrary/icon";
import { GetAspectColor, GetAspectIcon, UseIndentLevel, UseSetSelectNodes, GetSelectedNodes } from "../../../../../helpers";
import { IsAspectNode } from "../../../../../helpers/CheckTypes";

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
export const TreeAspectElement = ({ node, nodes, isLeaf, isExpanded, onToggleExpanded, indent }: Props) => {
  const selectedNodes = GetSelectedNodes();
  console.log({ selectedNodes });
  const [setActiveNodeElement] = UseSetSelectNodes();

  return (
    <AspectElementWrapper indent={UseIndentLevel(indent)}>
      {IsAspectNode(node) ? (
        <>
          <Icon size={22} src={GetAspectIcon(node)} alt="" />
          <span>{node.label}</span>
        </>
      ) : (
        <CheckboxExplorer
          color={GetAspectColor(node, AspectColorType.Selected)}
          isChecked={IsCheckedTree(node, selectedNodes)}
          onChange={() => OnSelectActiveNode(node, nodes, selectedNodes, setActiveNodeElement)}
          label={node.label}
        />
      )}
      {!isLeaf && <AspectExpandButton onClick={onToggleExpanded} isExpanded={isExpanded} />}
    </AspectElementWrapper>
  );
};
