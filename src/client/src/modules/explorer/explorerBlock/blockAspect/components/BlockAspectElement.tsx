import { AspectExpandButton } from "../../../shared/components/AspectExpandButton";
import { AspectColorType } from "../../../../../models";
import { Node } from "@mimirorg/modelbuilder-types";
import { GetAspectColor } from "../../../../../helpers";
import { CheckboxBlockExplorer } from "../../../../../compLibrary/input/checkbox/explorer/block/CheckboxBlockExplorer";
import { AspectElementWrapper } from "../../../shared/styled/AspectElementWrapper";
import { Dispatch } from "redux";
import { IsAspectNode } from "../../../../../helpers/Aspects";
import { GetAspectIcon, GetIndentLevel } from "../../../shared/helpers/";
import { ViewportData } from "../../../../../models/project";

interface Props {
  node: Node;
  nodes: Node[];
  selectedBlockNode: Node;
  dispatch: Dispatch;
  isLeaf: boolean;
  isExpanded: boolean;
  onToggleExpanded: () => void;
  indent?: number;
  viewportData: ViewportData;
  onChange: (node: Node) => void;
}

/**
 * Component for one element in the Explorer module's BlockAspectComponent.
 * @param interface
 * @returns an element with either an Aspect header or a checkbox.
 */
export const BlockAspectElement = ({ node, isLeaf, isExpanded, onToggleExpanded, indent, onChange }: Props) => (
  <AspectElementWrapper indent={GetIndentLevel(indent)}>
    <CheckboxBlockExplorer
      color={GetAspectColor(node, AspectColorType.Selected)}
      isChecked={node.blockSelected}
      isAspectNode={IsAspectNode(node)}
      onChange={() => onChange(node)}
      label={node.label ?? node.name}
      icon={GetAspectIcon(node)}
    />
    {!isLeaf && <AspectExpandButton onClick={onToggleExpanded} isExpanded={isExpanded} />}
  </AspectElementWrapper>
);
