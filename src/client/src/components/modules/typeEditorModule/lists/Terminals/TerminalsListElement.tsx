import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateTerminalTypes,
  changeTerminalTypeId,
  changeTerminalCategory,
  changeTerminalColor,
} from "../../../../../redux/store/typeEditor/actions";
import { TypeEditorState } from "../../../../../redux/store/typeEditor/types";
import { RootState } from "../../../../../redux/store";
import { AddTerminal } from "./AddTerminal/AddTerminalComponent";
import { RoundCheckbox } from "../../inputs/RoundCheckbox";
import { NumericInput } from "../../../../../compLibrary";
import "./AddTerminal/directiondropdown.scss";
import "./AddTerminal/terminalsearchbar.scss";
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
import { ObjectType } from "../../../../../models";

interface Props {
  id: string;
  category: string;
  terminals: any;
}

export const TerminalsListElement = ({ id, category, terminals }: Props) => {
  const dispatch = useDispatch();
  const [selectedCategory, setselectedCategory] = useState("");
  const [searchbarInput, setsearchbarInput] = useState("");
  const [expandList, setExpandList] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [clientTerminalList, setClientTerminalList] = useState([]);
  const [expandCategory, setExpandCategory] = useState(true);
  const [selectedTerminalId, setselectedTerminalId] = useState("");

  const state = useSelector<RootState>(
    (state) => state.typeEditor
  ) as TypeEditorState;

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
    setselectedTerminalId(terminalId);
    dispatch(changeTerminalTypeId(selectedTerminalId));
    dispatch(changeTerminalColor(terminalColor));
    toggleTerminalList();
  };

  const numberInput = (e) => {
    setQuantity(e.target.value);
  };

  const toggleExpand = () => {
    setExpandCategory((expandCategory) => !expandCategory);
  };

  const updateTerminalList = (i, terminal) => {
    let temp = clientTerminalList;
    temp[i] = terminal;
    setClientTerminalList(temp);
    dispatch(updateTerminalTypes(clientTerminalList));
  };

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

  const TransportOrInterface =
    (state.createLibraryType.objectType === ObjectType.Transport ||
      state.createLibraryType.objectType === ObjectType.Interface) ??
    false;

  useEffect(() => {
    setClientTerminalList(state.createLibraryType.terminalTypes);
  }, [state.createLibraryType.terminalTypes]);

  return (
    <TerminalListElement>
      {TransportOrInterface ? (
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
