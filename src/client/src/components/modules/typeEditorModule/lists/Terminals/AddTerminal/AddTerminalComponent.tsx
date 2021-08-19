import "./directiondropdown.scss";
import "./terminalsearchbar.scss";
import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { chooseTerminalType } from "../../../../../../redux/store/typeEditor/actions";
import { TypeEditorState } from "../../../../../../redux/store/typeEditor/types";
import { TerminalTypeItem, ConnectorType } from "../../../../../../models";
import { GetTerminalTypeValue } from "../helpers";
import { ValidateTerminal } from "../../../validators";
import { NumericInput } from "../../../../../../compLibrary";
import { AddTerminalElement } from "../../../styled";
import { TextResources } from "../../../../../../assets/text";
import {
  HelpIcon,
  ExpandIcon,
  CollapseIcon,
} from "../../../../../../assets/icons/common";
interface Props {
  terminals: any[];
  state: TypeEditorState;
  defaultTerminal?: TerminalTypeItem;
}

export const AddTerminal = ({ state, terminals, defaultTerminal }: Props) => {
  const dispatch = useDispatch();
  const [isListOpen, setIsListOpen] = useState(false);
  const [expandList, setExpandList] = useState(false);

  const [quantity, setQuantity] = useState(
    GetTerminalTypeValue(state.mode, "number", defaultTerminal)
  );
  const [searchbarInput, setsearchbarInput] = useState(
    GetTerminalTypeValue(state.mode, "terminaltype", defaultTerminal, terminals)
  );
  const [selectedTerminalId, setselectedTerminalId] = useState(
    GetTerminalTypeValue(
      state.mode,
      "terminalId",
      defaultTerminal,
      terminals
    ) as string
  );
  const [selectedDirectionId, setselectedDirectionId] = useState(
    GetTerminalTypeValue(state.mode, "direction", defaultTerminal)
  );
  const [selectedDirection, setselectedDirection] = useState(
    GetTerminalTypeValue(state.mode, "directionName", defaultTerminal)
  );

  const filteredTerminals = terminals.filter((terminal) => {
    return terminal.name.toLowerCase().includes(searchbarInput);
  });

  const onTerminalClick = (terminalId, terminalName) => {
    setsearchbarInput(terminalName);
    setselectedTerminalId(terminalId);
    toggleExpand();
  };

  const onQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const onChange = (e) => {
    setsearchbarInput(e.target.value.toLowerCase());
  };

  const onDirectionClick = (item) => {
    setselectedDirection(ConnectorType[item]);
    setselectedDirectionId(item);
    toggleList();
  };

  const toggleExpand = () => {
    setExpandList(!expandList);
  };

  const toggleList = () => {
    setIsListOpen(!isListOpen);
  };

  const stringIsNumber = (value) => isNaN(Number(value)) === false;

  // Update redux
  const updateTerminalList = useCallback(
    (terminal: TerminalTypeItem) => {
      dispatch(chooseTerminalType(state.mode, terminal));
    },
    [dispatch, state.mode]
  );

  // Validate terminals
  const addTerminalToArray = useCallback(() => {
    const terminal: TerminalTypeItem = {
      terminalTypeId: selectedTerminalId,
      number: Number(quantity),
      connectorType: Number(selectedDirectionId),
      selected: false,
    };
    if (ValidateTerminal(terminal)) updateTerminalList(terminal);
  }, [updateTerminalList, selectedTerminalId, selectedDirectionId, quantity]);

  useEffect(() => {
    addTerminalToArray();
  }, [addTerminalToArray]);

  return (
    <AddTerminalElement>
      <NumericInput>
        <label className={"quantity"}>
          <input
            type="number"
            min="0"
            max="30"
            placeholder="0"
            onChange={onQuantityChange}
            defaultValue={quantity}
          />
          <span className="number"></span>
        </label>
      </NumericInput>
      <img className="help-icon" src={HelpIcon} alt="help" />
      <div className="terminalSearchbarWrapper">
        <div className="terminalsearchbar_container">
          <div className="terminalsearchbar">
            <label htmlFor="terminalsearch" />
            <input
              type="text"
              defaultValue={searchbarInput}
              placeholder={TextResources.TypeEditor_Search}
              onChange={onChange}
              onFocus={toggleExpand}
            />
            <img
              src={expandList ? ExpandIcon : CollapseIcon}
              alt="expand-icon"
              onClick={toggleExpand}
              className="icon"
            />
          </div>
          {expandList && (
            <div className="terminalsearchbarlist">
              {filteredTerminals.map((terminal) => {
                return (
                  <div
                    className="terminallistitem"
                    key={terminal.id}
                    onClick={() => {
                      onTerminalClick(terminal.id, terminal.name);
                    }}
                  >
                    {terminal.name}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <img src={HelpIcon} alt="help" />
      <div className="dropdown_container">
        <label htmlFor="direction" />
        <div onClick={toggleList}>
          <div className="dropdown_header">
            <p>{selectedDirection}</p>
            <img
              src={isListOpen ? ExpandIcon : CollapseIcon}
              alt="expand-icon"
              onClick={toggleList}
            />
          </div>
        </div>
        {isListOpen && (
          <div className="dropdown_list">
            {Object.keys(ConnectorType)
              .filter(stringIsNumber)
              .map((item) => {
                return (
                  <div
                    key={item}
                    className="dropdown_listitem"
                    onClick={() => onDirectionClick(item)}
                  >
                    {ConnectorType[item]}
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </AddTerminalElement>
  );
};

export default AddTerminal;
