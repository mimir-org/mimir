import "./directiondropdown.scss";
import { TerminalTypeItem, ConnectorType } from "../../../../../../models";
import {
  NummericValueInput,
  SearchDropDown,
  SearchDropDownItem,
  DirectionalDropdown,
} from "../../../../../../compLibrary";
import { AddTerminalElement } from "../../../styled";
import { TextResources } from "../../../../../../assets/text";
import { HelpIcon } from "../../../../../../assets/icons/common";
interface Props {
  row: number;
  terminals: any[];
  defaultTerminal: TerminalTypeItem;
  onChange: Function;
}

const AddTerminal = ({ row, terminals, defaultTerminal, onChange }: Props) => {
  const onTerminalIdChange = (id: string) => {
    defaultTerminal.terminalTypeId = id;
    onChange(row, defaultTerminal);
  };

  const onQuantityChange = (item: number) => {
    defaultTerminal.number = item;
    onChange(row, defaultTerminal);
  };

  const onDirectionChange = (item: ConnectorType) => {
    defaultTerminal.connectorType = item;
    onChange(row, defaultTerminal);
  };

  return (
    <AddTerminalElement>
      <NummericValueInput
        value={defaultTerminal.number.toString()}
        onChange={(item: number) => onQuantityChange(item)}
      />

      <img className="help-icon" src={HelpIcon} alt="help" />

      <SearchDropDown
        value={defaultTerminal.terminalTypeId}
        onChange={(id: string) => onTerminalIdChange(id)}
        placeHolder={TextResources.TypeEditor_Search}
        list={terminals as SearchDropDownItem[]}
      />

      <img src={HelpIcon} alt="help" />

      <DirectionalDropdown
        onChange={(item: ConnectorType) => onDirectionChange(item)}
        value={defaultTerminal.connectorType}
      />
    </AddTerminalElement>
  );
};

export default AddTerminal;
