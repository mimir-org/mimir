import { AspectColorType, Node } from "../../../models";
import { useAppDispatch } from "../../../redux/store";
import { GetAspectColor } from "../../../helpers";
import { OnBlockChange } from "../handlers";
import { CheckboxBlockWrapper } from "./styled";
import { IsMiniCheckBox, IsChecked } from "./helpers";

interface Props {
  elements: any[];
  node: Node;
  inputLabel: string;
  selectedNode: Node;
  secondaryNode: Node;
}
/**
 * Checkbox used in the Explorer in BlockView
 * @param interface
 * @returns a checkbox with different styling for parentNodes and childNodes.
 */
export const CheckboxBlock = ({ elements, node, inputLabel, selectedNode, secondaryNode }: Props) => {
  const dispatch = useAppDispatch();

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
