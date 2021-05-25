import { GetNodes } from "../../../flow/helpers";
import { useDispatch, useSelector } from "react-redux";
import { changeActiveNode } from "../../../../redux/store/project/actions";
import { Node } from "../../../../models/project";
import { RootState } from "../../../../redux/store";
import { setSplitViewNode } from "../../../../redux/store/splitView/actions";

interface Props {
  nodeId: string;
  inputLabel: string;
}

export const CheckboxBlock = ({ nodeId, inputLabel }: Props) => {
  const dispatch = useDispatch();
  const nodes = GetNodes();
  const node = nodes.find((x) => x.id === nodeId);
  const selectedNode = nodes.find((x) => x.isSelected);

  const splitView = useSelector<RootState>(
    (state) => state.splitView.visible
  ) as boolean;
  const splitViewNode = useSelector<RootState>(
    (state) => state.splitView.node
  ) as Node;

  const isChecked = splitView
    ? node === selectedNode || node === splitViewNode
    : node === selectedNode;

  const handleChange = () => {
    splitView
      ? dispatch(setSplitViewNode(node))
      : dispatch(changeActiveNode(node.id));
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