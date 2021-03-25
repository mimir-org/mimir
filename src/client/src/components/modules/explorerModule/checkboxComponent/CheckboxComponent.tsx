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
    <div className="checkbox_container">
      <input
        type="checkbox"
        className="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <label className="checkbox_label">{inputLabel}</label>
    </div>
  );
};

export default CheckboxComponent;
