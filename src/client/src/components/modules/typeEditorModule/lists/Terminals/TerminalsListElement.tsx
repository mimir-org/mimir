import { useState } from "react";
import { useDispatch } from "react-redux";
import { ObjectType } from "../../../../../models";
import { TypeEditorState } from "../../../../../redux/store/typeEditor/types";
import { AddTerminal } from "./AddTerminal/AddTerminalComponent";
import { RoundCheckbox } from "../../inputs/RoundCheckbox";
import { NumericInput } from "../../../../../compLibrary";
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
  ExpandedIcon,
  CollapsedIcon,
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

  const selectCategory = () => {
    if (state.createLibraryType.objectType !== ObjectType.ObjectBlock) {
      setselectedCategory(category);
      dispatch(changeTerminalCategory(category));
    }
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
    setExpandCategory((expandCategory) => !expandCategory);
  };

  const terminalInput = (quantity) => {
    let temp = [];
    for (let i = 0; i < quantity; i++) {
      temp.push(<AddTerminal key={i} terminals={terminals} />);
    }
    return <>{temp}</>;
  };

  const transportOrInterface =
    (state.createLibraryType.objectType === ObjectType.Transport ||
      state.createLibraryType.objectType === ObjectType.Interface) ??
    false;

  return (
    <TerminalListElement>
      {transportOrInterface ? (
        <TerminalCategoryWrapper>
          <div onClick={selectCategory}>
            <RoundCheckbox id={category} label="terminal" />
          </div>
          <p className="category">{category}</p>
          {category === selectedCategory ? (
            <div className="terminalSearchbarWrapper">
              <div className="terminalsearchbar_container">
                <div className="terminalsearchbar">
                  <label htmlFor="terminalsearch" />
                  <input
                    type="text"
                    value={searchbarInput}
                    placeholder="Search or Select Terminal Media Type"
                    onChange={handleChange}
                    onFocus={toggleTerminalList}
                  />
                  <img
                    src={expandList ? ExpandedIcon : CollapsedIcon}
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
          ) : null}
        </TerminalCategoryWrapper>
      ) : (
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
      )}
      {quantity !== 0 &&
      expandCategory &&
      state.createLibraryType.objectType === ObjectType.ObjectBlock ? (
        <AddTerminalWrapper>{terminalInput(quantity)}</AddTerminalWrapper>
      ) : null}
    </TerminalListElement>
  );
};

export default TerminalsListElement;
