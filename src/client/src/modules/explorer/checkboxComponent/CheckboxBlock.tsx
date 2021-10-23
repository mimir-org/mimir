import { Node } from "../../../models";
import { splitNodeSelector, splitViewSelector, useAppDispatch, useAppSelector } from "../../../redux/store";
import { GetSelectedNode, IsLocation, IsProduct, IsFunction } from "../../../components/flow/helpers";
import { OnCheckboxChange } from "../handlers";
import { CheckboxWrapper } from "./styled";
import { Color } from "../../../compLibrary";

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

  const GetCheckboxColor = () => {
    if (IsFunction(node)) return Color.FunctionSelected;
    if (IsLocation(node)) return Color.LocationSelected;
    if (IsProduct(node)) return Color.ProductSelected;
  };

  return (
    <CheckboxWrapper color={GetCheckboxColor()}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => OnCheckboxChange(dispatch, splitView, node, selectedNode, splitViewNode)}
      />
      <div className="checkmark"></div>
      {inputLabel}
    </CheckboxWrapper>
  );
};

export default CheckboxBlock;
