import { AspectExpandButton } from "../shared/components/AspectExpandButton";
import { AspectColorType, Node } from "../../../../models";
import { GetAspectColor, GetAspectIcon, IsAspectNode, UseIndentLevel } from "../../../../helpers";
import { CheckboxExplorer } from "../../../../compLibrary/input/checkbox/explorer";
import { OnBlockChange } from "./handlers/OnBlockChange";
import { IsChecked } from "./helpers/IsChecked";
import { IsMiniCheckBox } from "./helpers/IsMiniCheckBox";
import { Elements } from "react-flow-renderer";
import { AspectElementWrapper } from "../shared/styled/AspectElementWrapper";
import { Dispatch } from "redux";

interface Props {
  node: Node;
  selectedNode: Node;
  secondaryNode: Node;
  elements: Elements;
  dispatch: Dispatch;
  isLeaf: boolean;
  isExpanded: boolean;
  onToggleExpanded: () => void;
  indent?: number;
}

/**
 * Component for one element in the Explorer module's BlockAspectComponent.
 * @param interface
 * @returns an element with either an Aspect header or a checkbox.
 */
export const BlockAspectElement = ({
  node,
  selectedNode,
  secondaryNode,
  elements,
  dispatch,
  isLeaf,
  isExpanded,
  onToggleExpanded,
  indent,
}: Props) => (
  <AspectElementWrapper indent={UseIndentLevel(indent)}>
    <CheckboxExplorer
      color={GetAspectColor(node, AspectColorType.Selected)}
      isChecked={IsChecked(elements, node)}
      isMiniCheckbox={IsMiniCheckBox(node, selectedNode, secondaryNode)}
      isBlockView={true}
      isAspectNode={IsAspectNode(node)}
      onChange={() => OnBlockChange(node, selectedNode, secondaryNode, dispatch)}
      label={node.label}
      icon={GetAspectIcon(node)}
    />
    {!isLeaf && <AspectExpandButton onClick={onToggleExpanded} isExpanded={isExpanded} />}
  </AspectElementWrapper>
);
