import { Elements } from "react-flow-renderer";
import { AspectColorType, Node } from "../../../models";
import { GetAspectColor, GetSelectedNode } from "../../../helpers";
import { CheckboxWrapper } from "./styled";
import { IsChecked, IsMiniCheckBox } from "./helpers";

interface Props {
  node: Node;
  label: string;
  secondaryNode: Node;
  elements: Elements<any>;
  onChange: () => void;
}
/**
 * Checkbox used in the Explorer in BlockView
 * @param interface
 * @returns a checkbox with different styling for parentNodes and childNodes.
 */
const CheckboxBlock = ({ node, label, secondaryNode, elements, onChange }: Props) => {
  const selectedNode = GetSelectedNode();

  return (
    <CheckboxWrapper
      color={GetAspectColor(node, AspectColorType.Selected)}
      miniCheckBox={IsMiniCheckBox(node, selectedNode, secondaryNode)}
    >
      <input type="checkbox" checked={IsChecked(elements, node)} onChange={() => onChange()} />
      <div className="label">{label}</div>
    </CheckboxWrapper>
  );
};

export default CheckboxBlock;
