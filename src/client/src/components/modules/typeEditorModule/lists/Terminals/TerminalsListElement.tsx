import { useState } from "react";
import { TerminalListElement } from "../../styled";
import { NumericInput } from "../../../../../componentLibrary";
import { unexpandedIcon } from "../../../../../assets/icons";

interface Props {
  name: String;
}

export const TerminalsListElement = ({ name }: Props) => {
  const [quantity, setQuantity] = useState(0);

  const numberInput = (e) => {
    if (e.length > 2) {
      e = e.value.slice(0, 2);
    }
    setQuantity(e.target.value);
  };

  return (
    <TerminalListElement>
      <NumericInput>
        <label className={"quantity"}>
          <input
            type="number"
            min="0"
            max="30"
            placeholder="0"
            onInput={numberInput}
          />
          <span className="number"></span>
        </label>
      </NumericInput>
      <p>{name}</p>
      <img src={unexpandedIcon} alt="expand-icon" />
    </TerminalListElement>
  );
};

export default TerminalsListElement;
