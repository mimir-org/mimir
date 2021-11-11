import { AspectColorType, Node } from "../../../models";
import { useAppDispatch } from "../../../redux/store";
import { GetAspectColor, GetSelectedNode } from "../../../helpers";
import { OnBlockChange } from "../handlers";
import { CheckboxBlockWrapper } from "./styled";
import { IsChecked, IsMiniCheckBox } from "./helpers";
import { Elements } from "react-flow-renderer";

interface Props {
  node: Node;
  inputLabel: string;
  secondaryNode: Node;
  elements: Elements<any>;
}
/**
 * Checkbox used in the Explorer in BlockView
 * @param interface
 * @returns a checkbox with different styling for parentNodes and childNodes.
 */
export const CheckboxBlock = ({ node, inputLabel, secondaryNode, elements }: Props) => {
  const dispatch = useAppDispatch();
  const selectedNode = GetSelectedNode();

  return (
    <CheckboxBlockWrapper
      color={GetAspectColor(node, AspectColorType.Selected)}
      miniCheckBox={IsMiniCheckBox(node, selectedNode, secondaryNode)}
    >
      <input
        type="checkbox"
        checked={IsChecked(elements, node)}
        onChange={() => OnBlockChange(node, selectedNode, secondaryNode, dispatch)}
      />
      <div className="label">{inputLabel}</div>
    </CheckboxBlockWrapper>
  );
};

export default CheckboxBlock;
