import React, { useEffect, useState } from "react";
import { NumericValueInputStyled } from "./NumericValueInput.styled";

interface Props {
  value: string;
  onChange: (quantity: number) => void;
}

const NumericValueInput = ({ value, onChange }: Props) => {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (value) {
      const num = parseInt(value) || 0;
      setQuantity(num);
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = parseInt(e.target.value) || 0;
    setQuantity(num);
  };

  return (
    <NumericValueInputStyled>
      <label className={"quantity"}>
        <input
          type="number"
          min="0"
          max="30"
          placeholder="0"
          onChange={handleChange}
          onBlur={() => onChange(quantity)}
          value={quantity}
        />
        <span className="number"></span>
      </label>
    </NumericValueInputStyled>
  );
};

export default NumericValueInput;
