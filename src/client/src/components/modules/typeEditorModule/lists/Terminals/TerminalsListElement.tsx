import { useState } from "react";
import { AddTerminal } from "../Terminals/AddTerminal";
import {
  TerminalListElement,
  TerminalCategoryWrapper,
  AddTerminalWrapper,
} from "../../styled";
import { NumericInput } from "../../../../../componentLibrary";
import {
  expandedIcon,
  unexpandedIcon,
} from "../../../../../assets/icons/common";

interface Props {
  terminal: any;
}

export const TerminalsListElement = ({ terminal }: Props) => {
  const [quantity, setQuantity] = useState(0);
  const [expandCategory, setExpandCategory] = useState(false);

  const toggleExpand = () => {
    setExpandCategory((expandCategory) => !expandCategory);
  };

  const numberInput = (e) => {
    setQuantity(e.target.value);
  };

  const terminalInput = (quantity) => {
    if (quantity !== 0) {
      let temp = [];
      for (let i = 0; i < quantity; i++) {
        temp.push(<AddTerminal terminal={terminal.terminal} />);
      }
      return <>{temp}</>;
    }
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
          <p>{terminal.terminalCategory}</p>
          {quantity !== 0 && (
            <img
              src={expandCategory ? expandedIcon : unexpandedIcon}
              alt="expand-icon"
              onClick={toggleExpand}
            />
          )}
        </TerminalCategoryWrapper>
        {quantity !== 0 && expandCategory && (
          <AddTerminalWrapper>{terminalInput(quantity)}</AddTerminalWrapper>
        )}
      </TerminalListElement>
    </>
  );
};

export default TerminalsListElement;
