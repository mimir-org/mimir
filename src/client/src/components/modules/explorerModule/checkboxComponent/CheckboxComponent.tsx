import { useState } from "react";
import { GetCheckboxColor } from "../helpers";
import "./checkbox.scss";
interface CheckboxComponentProps {
  id: string;
  inputLabel: string;
  checked?: boolean;
  aspect?: string;
}

export const CheckboxComponent = ({
  id,
  inputLabel,
  checked,
  aspect,
}: CheckboxComponentProps) => {
  const [isChecked, setChecked] = useState(false);
  const handleCheckboxChange = (event) => {
    setChecked(!isChecked);
  };
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
