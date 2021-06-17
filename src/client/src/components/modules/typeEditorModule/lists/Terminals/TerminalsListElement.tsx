import { useState } from "react";
import { AddTerminal } from "./AddTerminal/AddTerminalComponent";
import { NumericInput } from "../../../../../compLibrary";
import {
  TerminalListElement,
  TerminalCategoryWrapper,
  AddTerminalWrapper,
} from "../../styled";
import {
  ExpandedIcon,
  CollapsedIcon,
} from "../../../../../assets/icons/common";

interface Props {
  terminals: any;
}

export const TerminalsListElement = ({ terminals }: Props) => {
  const [quantity, setQuantity] = useState(0);
  const [expandCategory, setExpandCategory] = useState(false);

  const toggleExpand = () => {
    setExpandCategory((expandCategory) => !expandCategory);
  };

  const numberInput = (e) => {
    setQuantity(e.target.value);
  };

  const terminalInput = (quantity) => {
    let temp = [];
    for (let i = 0; i < quantity; i++) {
      temp.push(<AddTerminal terminals={terminals} />);
    }
    return <>{temp}</>;
  };

  return (
    <>
      <TerminalListElement>
        <TerminalCategoryWrapper>
          <NumericInput>
            <label className={"quantity"}>
              <input
                type="number"
                min="0"
                max="30"
                placeholder="0"
                onChange={numberInput}
              />
              <span className="number"></span>
            </label>
          </NumericInput>
          <p>{terminals.terminalCategory}</p>
          {quantity !== 0 ? (
            <img
              src={expandCategory ? ExpandedIcon : CollapsedIcon}
              alt="expand-icon"
              onClick={toggleExpand}
            />
          ) : null}
        </TerminalCategoryWrapper>
        {quantity !== 0 && expandCategory && (
          <AddTerminalWrapper>{terminalInput(quantity)}</AddTerminalWrapper>
        )}
      </TerminalListElement>
    </>
  );
};

export default TerminalsListElement;
