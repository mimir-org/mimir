import react, { useState } from "react";
import "./checkbox.scss";
interface CheckboxComponentProps {
  id: string;
  inputLabel: string;
  checked?: boolean;
}

export const CheckboxComponent = ({
  id,
  inputLabel,
  checked,
}: CheckboxComponentProps) => {
  const [isChecked, setChecked] = useState(false);
  const handleCheckboxChange = (event) => {
    setChecked(!isChecked);
  };
  return (
    <label className="container">
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
