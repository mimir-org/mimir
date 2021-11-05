import { Node } from "../../../models";
import { secondaryNodeSelector, useAppDispatch, useAppSelector } from "../../../redux/store";
import { GetSelectedNode } from "../../../components/flow/helpers";
import { OnBlockChange } from "../handlers";
import { CheckboxBlockWrapper } from "./styled";
import { IsChecked } from "../helpers";
import { GetAspectColor } from "../../../helpers";

interface Props {
  elements: any[];
  node: Node;
  inputLabel: string;
}
/**
 * Checkbox used in the Explorer in BlockView
 * @param interface
 * @returns a checkbox
 */
export const CheckboxBlock = ({ elements, node, inputLabel }: Props) => {
  const dispatch = useAppDispatch();
  const secondaryNode = useAppSelector(secondaryNodeSelector);
  const selectedNode = GetSelectedNode();
  const isSelectedNode = node === selectedNode;
  const isSecondaryNode = node === secondaryNode;

  return (
    <CheckboxBlockWrapper
      color={GetAspectColor(node, "selected")}
      isSelectedNode={isSelectedNode}
      isSecondaryNode={isSecondaryNode}
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
