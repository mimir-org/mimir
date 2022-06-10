import { AspectExpandButton } from "../../../shared/components/AspectExpandButton";
import { AspectColorType } from "../../../../../models";
import { Node } from "@mimirorg/modelbuilder-types";
import { CheckboxTreeExplorer } from "../../../../../compLibrary/input/checkbox/explorer/tree/CheckboxTreeExplorer";
import { OnSelectActiveNode } from "./handlers/OnSelectActiveNode";
import { IsNodeInTreeExplorerChecked } from "./helpers/IsNodeInTreeExplorerChecked";
import { AspectElementWrapper } from "../../../shared/styled/AspectElementWrapper";
import { Icon } from "../../../../../compLibrary/icon/Icon";
import { GetAspectColor } from "../../../../../helpers";
import { IsAspectNode } from "../../../../../helpers/Aspects";
import { GetAspectIcon, GetIndentLevel } from "../../../shared/helpers/";
import { Dispatch } from "redux";

interface Props {
  node: Node;
  isLeaf: boolean;
  isExpanded: boolean;
  onToggleExpanded: () => void;
  indent: number;
  dispatch: Dispatch;
}

/**
 * Component for one element in the Explorer module's TreeAspectComponent.
 * @param interface
 * @returns an element with either an Aspect header or a checkbox.
 */
export const TreeAspectElement = ({ node, isLeaf, isExpanded, onToggleExpanded, indent, dispatch }: Props) => {
  const isChecked = IsNodeInTreeExplorerChecked(node.id);

  return (
    <AspectElementWrapper indent={GetIndentLevel(indent)}>
      {IsAspectNode(node) ? (
        <>
          <Icon size={22} src={GetAspectIcon(node)} alt="" />
          <span>{node.label}</span>
        </>
      ) : (
        <CheckboxTreeExplorer
          color={GetAspectColor(node, AspectColorType.Selected)}
          isChecked={isChecked}
          onChange={() => OnSelectActiveNode(node, isChecked, dispatch)}
          label={node.label}
        />
      )}
      {!isLeaf && <AspectExpandButton onClick={onToggleExpanded} isExpanded={isExpanded} />}
    </AspectElementWrapper>
  );
};
