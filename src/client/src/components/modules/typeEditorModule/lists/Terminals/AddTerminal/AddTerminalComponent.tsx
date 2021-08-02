import "./directiondropdown.scss";
import "./terminalsearchbar.scss";
import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { addTerminalType } from "../../../../../../redux/store/typeEditor/actions";
import { TerminalTypeItem, ConnectorType } from "../../../../../../models";
import { NumericInput } from "../../../../../../compLibrary";
import { AddTerminalElement } from "../../../styled";
import { ValidateTerminal } from "../../../validators";
import { TextResources } from "../../../../../../assets/text";
import {
  HelpIcon,
  ExpandIcon,
  CollapseIcon,
} from "../../../../../../assets/icons/common";

interface Props {
  terminals: any[];
}

export const AddTerminal = ({ terminals }: Props) => {
  const dispatch = useDispatch();
  const [searchbarInput, setsearchbarInput] = useState("");
  const [selectedDirection, setselectedDirection] = useState("Direction");
  const [isListOpen, setIsListOpen] = useState(false);
  const [expandList, setExpandList] = useState(false);
  const [selectedDirectionId, setselectedDirectionId] = useState(null);
  const [selectedTerminalId, setselectedTerminalId] = useState("");
  const [quantity, setQuantity] = useState(0);

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

  const filteredTerminals = terminals.filter((terminal) => {
    return terminal.name.toLowerCase().includes(searchbarInput);
  });

  // Update redux
  const updateTerminalList = useCallback(
    (terminal: TerminalTypeItem) => {
      dispatch(addTerminalType(terminal));
    },
    [dispatch]
  );

  // Validate terminals
  const addTerminalToArray = useCallback(() => {
    const terminal: TerminalTypeItem = {
      terminalTypeId: selectedTerminalId,
      number: Number(quantity),
      connectorType: Number(selectedDirectionId),
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
              value={searchbarInput}
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
