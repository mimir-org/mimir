import { Node } from "../../../models";
import { splitNodeSelector, splitViewSelector, useAppDispatch, useAppSelector } from "../../../redux/store";
import { GetSelectedNode } from "../../../components/flow/helpers";
import { OnCheckboxChange } from "../handlers";
import { CheckboxWrapper } from "./styled";
import { GetCheckboxColor } from "../helpers";

interface Props {
  node: Node;
  inputLabel: string;
}
/**
 * Checkbox used in the Explorer in BlockView
 * @param interface
 * @returns a checkbox
 */
export const CheckboxBlock = ({ node, inputLabel }: Props) => {
  const dispatch = useAppDispatch();
  const splitView = useAppSelector(splitViewSelector);
  const splitViewNode = useAppSelector(splitNodeSelector);
  const selectedNode = GetSelectedNode();
  const isSplitViewNode = splitViewNode?.id === node.id;
  const isChecked = splitView ? node === selectedNode || isSplitViewNode : node === selectedNode;

  return (
    <CheckboxWrapper color={GetCheckboxColor(node)}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => OnCheckboxChange(dispatch, splitView, node, selectedNode, splitViewNode)}
      />
      <div className="checkmark"></div>
      <div className="label">{inputLabel}</div>
    </CheckboxWrapper>
  );
};

export default CheckboxBlock;
