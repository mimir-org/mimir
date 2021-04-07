import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { GetCheckboxColor } from "../helpers";
import useChangeNodeVisibility from "../hooks/useChangeNodeVisibility";
import "./checkbox.scss";

interface Props {
  id: string;
  inputLabel: string;
  aspect?: string;
}

export const CheckboxComponent = ({ id, inputLabel, aspect }: Props) => {
  const nodes: any = useSelector<RootState>(
    (state) => state.projectState.project.nodes
  );
  const node = nodes.find((node) => node.id === id);
  const isChecked: any = node.isVisible;
  const handleCheckboxChange = useChangeNodeVisibility(id, isChecked);

  const underlineColor = GetCheckboxColor(aspect);

  return (
    <label className={"checkbox " + underlineColor}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <span className="checkmark"></span>
      <label className="checkbox_label">{inputLabel}</label>
    </label>
  );
};

export default CheckboxComponent;
