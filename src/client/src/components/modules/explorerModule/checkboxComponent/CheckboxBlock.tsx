import { useDispatch, useSelector } from "react-redux";
import { Node } from "../../../../models";
import { RootState } from "../../../../redux/store";
import { GetSelectedNode } from "../../../flow/helpers/common";
import { OnCheckboxChange } from "../handlers";

interface Props {
  node: Node;
  inputLabel: string;
}

export const CheckboxBlock = ({ node, inputLabel }: Props) => {
  const dispatch = useDispatch();

  const splitView = useSelector<RootState>(
    (state) => state.splitView.visible
  ) as boolean;

  const splitViewNode = useSelector<RootState>(
    (state) => state.splitView.node
  ) as Node;

  const selectedNode = GetSelectedNode();
  const isSplitViewNode = splitViewNode?.id === node.id;

  const isChecked = splitView
    ? node === selectedNode || isSplitViewNode
    : node === selectedNode;

  return (
    <label className={"checkbox"}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => OnCheckboxChange(dispatch, splitView, node)}
      />
      <span className="checkmark"></span>
      <label className="checkbox_label">{inputLabel}</label>
    </label>
  );
};

export default CheckboxBlock;
