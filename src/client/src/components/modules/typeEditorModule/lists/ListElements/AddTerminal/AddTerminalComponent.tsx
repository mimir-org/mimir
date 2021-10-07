import { useEffect } from "react";
import { TerminalTypeItem, ConnectorType } from "../../../../../../models";
import { AddTerminalElement } from "../../../styled";
import { TextResources } from "../../../../../../assets/text";
import { CloseIcon } from "../../../../../../assets/icons/common";
import {
  NumericValueInput,
  SearchDropDown,
  SearchDropDownItem,
  DirectionalDropdown,
} from "../../../../../../compLibrary";

interface Props {
  terminals: any[];
  defaultTerminal: TerminalTypeItem;
  onChange: Function;
}

const AddTerminal = ({ terminals, defaultTerminal, onChange }: Props) => {
  const onTerminalIdChange = (id: string) => {
    defaultTerminal.terminalTypeId = id;
    onChange("update", defaultTerminal);
  };

  const onQuantityChange = (item: number) => {
    defaultTerminal.number = item;
    onChange("update", defaultTerminal);
  };

  const onDirectionChange = (item: number) => {
    defaultTerminal.connectorType = Number(item);
    onChange("update", defaultTerminal);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultTerminal]);

  return (
    <AddTerminalElement>
      <NumericValueInput value={defaultTerminal.number.toString()} onChange={(item: number) => onQuantityChange(item)} />
      <SearchDropDown
        value={defaultTerminal.terminalTypeId}
        onChange={(id: string) => onTerminalIdChange(id)}
        placeHolder={TextResources.TypeEditor_Search}
        list={terminals as SearchDropDownItem[]}
      />
      <DirectionalDropdown
        onChange={(item: ConnectorType) => onDirectionChange(item)}
        defaultValue={defaultTerminal.connectorType}
      />
      <button onClick={() => onChange("remove", defaultTerminal)}>
        <img src={CloseIcon} alt="delete" className="delete-icon" />
      </button>
    </AddTerminalElement>
  );
};

export default AddTerminal;
