import { useState, useEffect } from "react";
import { NumericInput } from "..";

interface Props {
  value: string;
  onChange: Function;
}

const NumericValueInput = ({ value, onChange }: Props) => {
  const [quantity, setQuantity] = useState("1");

  useEffect(() => {
    if (value) {
      var num = parseInt(value) || 0;
      setQuantity(num.toString());
    }
  }, [value]);

  const handleChange = (e: any) => {
    var num = parseInt(e.target.value) || 0;
    setQuantity(num.toString());
    onChange(num);
  };

  return (
    <NumericInput>
      <label className={"quantity"}>
        <input
          type="number"
          min="0"
          max="30"
          placeholder="0"
          onChange={handleChange}
          value={quantity}
        />
        <span className="number"></span>
      </label>
    </NumericInput>
  );
};

export default NumericValueInput;
