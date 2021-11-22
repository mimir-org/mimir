import { AspectColorType, Node } from "../../../models";
import { GetAspectColor, GetAspectIcon, IsAspectNode } from "../../../helpers";
import { CheckboxExplorer } from "../../../compLibrary/input/checkbox/explorer";
import { OnBlockChange } from "../handlers";
import { IsChecked, IsMiniCheckbox } from "../helpers";
import { Elements } from "react-flow-renderer";
import { AspectHeader } from "./styled";

interface Props {
  node: Node;
  selectedNode: Node;
  secondaryNode: Node;
  elements: Elements<any>;
  label: string;
  dispatch: any;
}

/**
 * Component for one element in the the Explorer module's BlockAspectComponent.
 * @param interface
 * @returns an element with either an Aspect header or a checkbox.
 */
const BlockAspectElement = ({ node, selectedNode, secondaryNode, elements, label, dispatch }: Props) => (
  <>
    {IsAspectNode(node) && (
      <AspectHeader>
        <img src={GetAspectIcon(node)} alt="aspect-icon" className="icon-block" />
      </AspectHeader>
    )}
    <CheckboxExplorer
      label={label}
      color={GetAspectColor(node, AspectColorType.Selected)}
      isChecked={IsChecked(elements, node)}
      isMiniCheckbox={IsMiniCheckbox(node, selectedNode, secondaryNode)}
      isBlockView={true}
      isAspectNode={IsAspectNode(node)}
      onChange={() => OnBlockChange(node, selectedNode, secondaryNode, dispatch)}
    />
  </>
);

export default BlockAspectElement;
