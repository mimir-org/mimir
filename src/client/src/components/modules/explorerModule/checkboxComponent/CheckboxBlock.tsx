import { GetNodes } from "../../../flow/helpers";
import { useDispatch } from "react-redux";
import { changeActiveNode } from "../../../../redux/store/project/actions";
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
  let isHidden = node !== selectedNode;

  const handleChange = () => {
    dispatch(changeActiveNode(node.id));
  };

  return (
    <label className={"checkbox"}>
      <input type="checkbox" checked={!isHidden} onChange={handleChange} />
      <span className="checkmark"></span>
      <label className="checkbox_label">{inputLabel}</label>
    </label>
  );
};

export default CheckboxBlock;
