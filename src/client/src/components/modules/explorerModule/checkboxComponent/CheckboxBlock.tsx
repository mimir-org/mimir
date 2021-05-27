import { GetNodes } from "../../../flow/helpers";
import { useDispatch, useSelector } from "react-redux";
import { changeActiveNode } from "../../../../redux/store/project/actions";
import { Node, NODE_TYPE } from "../../../../models/project";
import { RootState } from "../../../../redux/store";
import { setSplitViewNode } from "../../../../redux/store/splitView/actions";
import { IsBlockChecked } from "../../../flow/helpers/block";

interface Props {
  nodeId: string;
  inputLabel: string;
}

export const CheckboxBlock = ({ nodeId, inputLabel }: Props) => {
  const dispatch = useDispatch();
  const nodes = GetNodes();
  const node = nodes.find((x) => x.id === nodeId);
  const selectedNode = nodes.find((x) => x.isSelected);
  const selectedBlockNode = nodes.find((x) => x.isBlockSelected);

  const splitView = useSelector<RootState>(
    (state) => state.splitView.visible
  ) as boolean;

  const splitViewNode = useSelector<RootState>(
    (state) => state.splitView.node
  ) as Node;

  const isChecked = IsBlockChecked(
    splitView,
    node,
    selectedNode,
    splitViewNode,
    selectedBlockNode
  );

  // TODO: Rewrite this
  const handleChange = () => {
    if (splitView) {
      if (node.type === NODE_TYPE.ASPECT_FUNCTION) {
        return;
      }
      if (node === selectedNode) {
        return;
      }
      if (node.type === NODE_TYPE.FUNCTION && node.level < selectedNode.level) {
        return;
      }
      dispatch(setSplitViewNode(node));
    } else {
      dispatch(changeActiveNode(node.id, true));
    }
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
