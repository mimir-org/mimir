import { useDispatch, useSelector } from "react-redux";
import { changeActiveNode } from "../../../../redux/store/project/actions";
import { Node } from "../../../../models";
import { RootState } from "../../../../redux/store";
import { setSplitNode } from "../../../../redux/store/splitView/actions";
import { IsConnectView } from "../../../flow/helpers/block/connectView";
import { FindSelectedNode, IsFunction } from "../../../flow/helpers/common";
import { removeMainNodes } from "../../../../redux/store/connectView/actions";

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

  const selectedNode = FindSelectedNode();
  const isSplitViewNode = splitViewNode?.id === node.id;
  const isChecked = splitView
    ? node === selectedNode || isSplitViewNode
    : node === selectedNode;

  const handleChange = () => {
    if (IsConnectView()) {
      dispatch(removeMainNodes());
    }
    if (splitView) {
      IsFunction(node)
        ? dispatch(changeActiveNode(node.id, true))
        : dispatch(setSplitNode(node));
    } else dispatch(changeActiveNode(node.id, true));
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
