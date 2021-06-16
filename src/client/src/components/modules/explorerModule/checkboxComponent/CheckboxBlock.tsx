import { GetNodes, IsFunctionNode } from "../../../flow/helpers/common";
import { useDispatch, useSelector } from "react-redux";
import { changeActiveNode } from "../../../../redux/store/project/actions";
import { Node } from "../../../../models/project";
import { RootState } from "../../../../redux/store";
import { setNode } from "../../../../redux/store/splitView/actions";

interface Props {
  node: Node;
  inputLabel: string;
}

export const CheckboxBlock = ({ node, inputLabel }: Props) => {
  const dispatch = useDispatch();
  const nodes = GetNodes();

  const splitView = useSelector<RootState>(
    (state) => state.splitView.visible
  ) as boolean;

  const splitViewNode = useSelector<RootState>(
    (state) => state.splitView.node
  ) as Node;

  const selectedNode = nodes.find((x) => x.isSelected);

  const isChecked = splitView
    ? node === selectedNode || node === splitViewNode
    : node === selectedNode;

  const handleChange = () => {
    if (splitView) {
      IsFunctionNode(node)
        ? dispatch(changeActiveNode(node?.id, true))
        : dispatch(setNode(node));
    } else dispatch(changeActiveNode(node?.id, true));
  };

  return (
    <label className={"checkbox"}>
      <input type="checkbox" checked={isChecked} onChange={handleChange} />
      <span className="checkmark"></span>
      <label className="checkbox_label">{inputLabel}</label>
    </label>
  );
};

export default CheckboxBlock;
