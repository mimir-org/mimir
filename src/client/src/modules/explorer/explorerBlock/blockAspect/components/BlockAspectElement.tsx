import { AspectExpandButton } from "../../../shared/components/AspectExpandButton";
import { GetAspectIcon } from "assets";
import { CheckboxBlockExplorer } from "../../../../../compLibrary/input/checkbox/explorer/block/CheckboxBlockExplorer";
import { AspectElementWrapper } from "../../../shared/styled/AspectElementWrapper";
import { Dispatch } from "redux";
import { GetIndentLevel } from "../../../shared/helpers/";
import { ViewportData } from "../../../../../models/project";
import { Block } from "lib";

interface Props {
  node: Block;
  nodes: Block[];
  selectedBlockNode: Block;
  dispatch: Dispatch;
  isLeaf: boolean;
  isExpanded: boolean;
  onToggleExpanded: () => void;
  indent?: number;
  viewportData: ViewportData;
  onChange: (node: Block) => void;
}

/**
 * Component for one element in the Explorer module's BlockAspectComponent.
 * @param interface
 * @returns an element with either an Aspect header or a checkbox.
 */
export const BlockAspectElement = ({ node, isLeaf, isExpanded, onToggleExpanded, indent, onChange }: Props) => (
  <AspectElementWrapper indent={GetIndentLevel(indent)}>
    <CheckboxBlockExplorer
      color={node.aspectColor.selectedColor}
      isChecked={node.blockSelected}
      isAspectNode={node.isRoot()}
      onChange={() => onChange(node)}
      label={node.label ?? node.name}
      icon={GetAspectIcon(node)}
    />
    {!isLeaf && <AspectExpandButton onClick={onToggleExpanded} isExpanded={isExpanded} />}
  </AspectElementWrapper>
);
