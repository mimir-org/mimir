import { GetNodes } from "../../../flow/helpers";
import { useDispatch, useSelector } from "react-redux";
import { changeActiveNode } from "../../../../redux/store/project/actions";
import { Node, NODE_TYPE } from "../../../../models/project";
import { RootState } from "../../../../redux/store";
import { setSplitViewNode } from "../../../../redux/store/splitView/actions";
import "./checkbox.scss";

interface Props {
  nodeId: string;
  inputLabel: string;
}

export const CheckboxBlock = ({ nodeId, inputLabel }: Props) => {
  const dispatch = useDispatch();
  const nodes = GetNodes();
  const node = nodes.find((x) => x.id === nodeId);
  const selectedNode = nodes.find((x) => x.isSelected);
  const isProduct = node.type === NODE_TYPE.PRODUCT;

  const splitView = useSelector<RootState>(
    (state) => state.splitView.visible
  ) as boolean;
  const splitViewNode = useSelector<RootState>(
    (state) => state.splitView.node
  ) as Node;

  let isHidden = splitView
    ? node !== selectedNode && node !== splitViewNode
    : node !== selectedNode;

  const handleChange = () => {
    if (splitView) {
      if (splitViewNode) dispatch(setSplitViewNode(null));
      else dispatch(setSplitViewNode(node));
    } else dispatch(changeActiveNode(node.id));
  };

  return (
    !isProduct && (
      <label className={"checkbox"}>
        <input type="checkbox" checked={!isHidden} onChange={handleChange} />
        <span className="checkmark"></span>
        <label className="checkbox_label">{inputLabel}</label>
      </label>
    )
  );
};

export default CheckboxBlock;
