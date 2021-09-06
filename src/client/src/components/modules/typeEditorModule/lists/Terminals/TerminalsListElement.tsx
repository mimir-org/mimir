import { useState } from "react";
import { useDispatch } from "react-redux";
import { TypeEditorState } from "../../../../../redux/store/typeEditor/types";
import { default as AddTerminal } from "./AddTerminal/AddTerminalComponent";
import { RoundCheckbox } from "../../inputs/RoundCheckbox";
import { NumericInput } from "../../../../../compLibrary";
import { TextResources } from "../../../../../assets/text";
import {
  IsInterface,
  IsObjectBlock,
  IsTransport,
  ModeEdit,
} from "../../helpers";
import {
  GetDefaultQuantity,
  GetDefaultTerminal,
  GetDefaultTerminalName,
} from "./helpers";
import {
  chooseTerminalTypeId,
  chooseTerminalCategory,
  chooseTerminalColor,
  chooseTerminalName,
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
import { ConnectorType, TerminalTypeItem } from "../../../../../models";

interface Props {
  // number: number;
  category: string;
  terminals: any[];
  state: TypeEditorState;
}

export const TerminalsListElement = ({ category, terminals, state }: Props) => {
  const dispatch = useDispatch();
  const [selectedTerminal, setSelectedTerminal] = useState(
    GetDefaultTerminal(state, terminals)
  );

  const [selectedCategory, setselectedCategory] = useState(
    ModeEdit(state.mode) && !IsObjectBlock(state.selectedNode.objectType)
      ? selectedTerminal.terminalCategory.name
      : ""
  );

  const [searchbarInput, setSearchbarInput] = useState(
    GetDefaultTerminalName(state, selectedTerminal)
  );

  const [quantity, setQuantity] = useState(GetDefaultQuantity(state));
  const [expandList, setExpandList] = useState(false);
  const [expandCategory, setExpandCategory] = useState(true);

  let objectType = ModeEdit(state.mode)
    ? state.selectedNode.objectType
    : state.createLibraryType.objectType;

  const selectCategory = () => {
    setselectedCategory(category);
    dispatch(chooseTerminalCategory(category));
  };

  const handleChange = (e) => {
    setSearchbarInput(e.target.value.toLowerCase());
    dispatch(chooseTerminalName(e.target.value));
  };

  const toggleTerminalList = () => {
    setExpandList(!expandList);
  };

  const handleTerminalClick = (terminal) => {
    setSearchbarInput(terminal.name);
    setSelectedTerminal(terminal);
    dispatch(chooseTerminalName(terminal.name));
    dispatch(chooseTerminalTypeId(state.mode, terminal.id));
    dispatch(chooseTerminalColor(terminal.color));
    dispatch(chooseTerminalCategory(category));
    toggleTerminalList();
  };

  const numberInput = (e) => {
    setQuantity(e.target.value);
    dispatch(removeTerminalTypes());
  };

  const terminalOnChange = (row: number, terminal: TerminalTypeItem) => {
    console.log("TerminalOnChange:", row, terminal);
  };

  const updateTerminals = () => {
    let terminalsArray = [];
    if (ModeEdit(state.mode) && state.selectedNode.terminalTypes) {
      terminalsArray = state.selectedNode.terminalTypes;

      for (let i = 0; i < state.selectedNode.terminalTypes.length; i++) {}

      return terminalsArray.map((t, index) => {
        return (
          <AddTerminal
            row={index}
            key={index}
            terminals={terminals}
            defaultTerminal={t}
            onChange={terminalOnChange}
          />
        );
      });
    } else {
      for (let i = 0; i < quantity; i++) {
        const defaultTerminal = {
          connectorType: ConnectorType.Input,
          number: 1,
          terminalTypeId: null,
        } as TerminalTypeItem;

        terminalsArray.push(
          <AddTerminal
            row={i}
            key={i}
            terminals={terminals}
            defaultTerminal={defaultTerminal}
            onChange={terminalOnChange}
          />
        );
      }
      return terminalsArray;
    }
  };

  return (
    <TerminalListElement>
      {(IsTransport(objectType) || IsInterface(objectType)) && (
        <TerminalCategoryWrapper>
          <div onClick={selectCategory}>
            <RoundCheckbox
              id={category}
              label="terminal"
              defaultValue={selectedTerminal}
            />
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
                            handleTerminalClick(t);
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
                onChange={numberInput}
                value={quantity}
              />
              <span className="number"></span>
            </label>
          </NumericInput>
          <p>{category}</p>
          {quantity !== 0 && (
            <img
              src={expandCategory ? ExpandIcon : CollapseIcon}
              alt="expand-icon"
              onClick={() => setExpandCategory(!expandCategory)}
            />
          )}
        </TerminalCategoryWrapper>
      )}
      {quantity > 0 && expandCategory && IsObjectBlock(objectType) && (
        <AddTerminalWrapper>{updateTerminals()}</AddTerminalWrapper>
      )}
    </TerminalListElement>
  );
};

export default TerminalsListElement;
