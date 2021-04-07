import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { GetCheckboxColor } from "../helpers";
import "./checkbox.scss";

interface Props {
  id: string;
  inputLabel: string;
  aspect?: string;
}

export const CheckboxComponent = ({ id, inputLabel, aspect }: Props) => {
  console.log(id);
  const isChecked: any = useSelector<RootState>(
    (state) => state.projectState.project.nodes[0].isVisible
  );
  const handleCheckboxChange = (event) => {};
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
