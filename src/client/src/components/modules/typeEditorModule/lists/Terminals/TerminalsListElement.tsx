import { useState } from "react";
import { useDispatch } from "react-redux";
import { TypeEditorState } from "../../../../../redux/store/typeEditor/types";
import { AddTerminal } from "./AddTerminal/AddTerminalComponent";
import { RoundCheckbox } from "../../inputs/RoundCheckbox";
import { NumericInput } from "../../../../../compLibrary";
import { TextResources } from "../../../../../assets/text";
import { IsInterface, IsObjectBlock, IsTransport } from "../../helpers";
import {
  changeTerminalTypeId,
  changeTerminalCategory,
  changeTerminalColor,
  removeTerminalTypes,
} from "../../../../../redux/store/typeEditor/actions";
import {
  TerminalListElement,
  TerminalCategoryWrapper,
  AddTerminalWrapper,
} from "../../styled";
import {
  HelpIcon,
  ExpandIcon,
  CollapseIcon,
} from "../../../../../assets/icons/common";

interface Props {
  category: string;
  terminals: any[];
  state: TypeEditorState;
}

export const TerminalsListElement = ({ category, terminals, state }: Props) => {
  const dispatch = useDispatch();
  const [selectedCategory, setselectedCategory] = useState("");
  const [searchbarInput, setsearchbarInput] = useState("");
  const [expandList, setExpandList] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [expandCategory, setExpandCategory] = useState(true);
  const objectType = state.createLibraryType.objectType;

  const selectCategory = () => {
    setselectedCategory(category);
    dispatch(changeTerminalCategory(category));
  };

  const handleChange = (e) => {
    setsearchbarInput(e.target.value.toLowerCase());
  };

  const toggleTerminalList = () => {
    setExpandList(!expandList);
  };

  const handleTerminalClick = (terminalId, terminalName, terminalColor) => {
    setsearchbarInput(terminalName);
    dispatch(changeTerminalTypeId(terminalId));
    dispatch(changeTerminalColor(terminalColor));
    toggleTerminalList();
  };

  const numberInput = (e) => {
    setQuantity(e.target.value);
    dispatch(removeTerminalTypes());
  };

  const toggleExpand = () => {
    setExpandCategory(!expandCategory);
  };

  // Add terminals
  const terminalInput = (terminalCount: number) => {
    let temp = [];
    for (let i = 0; i < terminalCount; i++) {
      temp.push(<AddTerminal key={i} terminals={terminals} />);
    }
    return <>{temp}</>;
  };

  return (
    <TerminalListElement>
      {(IsTransport(objectType) || IsInterface(objectType)) && (
        <TerminalCategoryWrapper>
          <div onClick={selectCategory}>
            <RoundCheckbox id={category} label="terminal" />
          </div>
          <p className="category">{category}</p>
          {category === selectedCategory && (
            <div className="terminalSearchbarWrapper">
              <div className="terminalsearchbar_container">
                <div className="terminalsearchbar">
                  <label htmlFor="terminalsearch" />
                  <input
                    type="text"
                    value={searchbarInput}
                    placeholder={TextResources.TypeEditor_Search}
                    onChange={handleChange}
                    onFocus={toggleTerminalList}
                  />
                  <img
                    src={expandList ? ExpandIcon : CollapseIcon}
                    alt="expand-icon"
                    onClick={toggleTerminalList}
                    className="icon"
                  />
                </div>
                {expandList && (
                  <div className="terminalsearchbarlist">
                    {terminals.map((t) => {
                      return (
                        <div
                          className="terminallistitem"
                          key={t.id}
                          onClick={() => {
                            handleTerminalClick(t.id, t.name, t.color);
                          }}
                        >
                          {t.name}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              <img className="helpIcon" src={HelpIcon} alt="help" />
            </div>
          )}
        </TerminalCategoryWrapper>
      )}

      {IsObjectBlock(objectType) && (
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
          {quantity !== 0 && (
            <img
              src={expandCategory ? ExpandIcon : CollapseIcon}
              alt="expand-icon"
              onClick={toggleExpand}
            />
          )}
        </TerminalCategoryWrapper>
      )}
      {quantity !== 0 && expandCategory && IsObjectBlock(objectType) && (
        <AddTerminalWrapper>{terminalInput(quantity)}</AddTerminalWrapper>
      )}
    </TerminalListElement>
  );
};

export default TerminalsListElement;
