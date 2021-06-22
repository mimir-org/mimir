import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTerminalTypes } from "../../../../../redux/store/typeEditor/actions";
import { TypeEditorState } from "../../../../../redux/store/typeEditor/types";
import { RootState } from "../../../../../redux/store";

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
  category: string;
  terminals: any;
}

export const TerminalsListElement = ({ category, terminals }: Props) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(0);
  const [clientTerminalList, setClientTerminalList] = useState([]);
  const [expandCategory, setExpandCategory] = useState(true);

  const state = useSelector<RootState>(
    (state) => state.typeEditor
  ) as TypeEditorState;

  const toggleExpand = () => {
    setExpandCategory((expandCategory) => !expandCategory);
  };

  const numberInput = (e) => {
    setQuantity(e.target.value);
  };

  const updateTerminalList = (i, terminal) => {
    let temp = clientTerminalList;
    temp[i] = terminal;
    setClientTerminalList(temp);
    dispatch(updateTerminalTypes(clientTerminalList));
  };

  useEffect(() => {
    setClientTerminalList(state.createLibraryType.terminalTypes);
  }, []);

  const terminalInput = (quantity) => {
    let temp = [];
    for (let i = 0; i < quantity; i++) {
      temp.push(
        <AddTerminal
          handleTerminalChange={(t) => {
            updateTerminalList(i, t);
          }}
          key={i}
          terminals={terminals}
          quantity={quantity}
        />
      );
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
          <p>{category}</p>
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
