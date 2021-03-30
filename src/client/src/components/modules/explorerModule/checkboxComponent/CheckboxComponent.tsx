import react, { useState } from "react";
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
  const underlineColor =
    aspect === "function"
      ? "function_underline"
      : aspect === "location"
      ? "location_underline"
      : aspect === "product"
      ? "product_underline"
      : null;

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
