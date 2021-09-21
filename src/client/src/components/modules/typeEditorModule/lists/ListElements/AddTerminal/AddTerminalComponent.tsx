import { TerminalTypeItem, ConnectorType } from "../../../../../../models";
import {
  NummericValueInput,
  SearchDropDown,
  SearchDropDownItem,
  DirectionalDropdown,
} from "../../../../../../compLibrary";
import { AddTerminalElement } from "../../../styled";
import { TextResources } from "../../../../../../assets/text";
import { HelpIcon, DeleteIcon } from "../../../../../../assets/icons/common";
interface Props {
  row: number;
  terminals: any[];
  defaultTerminal: TerminalTypeItem;
  onChange: Function;
}

const AddTerminal = ({ row, terminals, defaultTerminal, onChange }: Props) => {
  const onTerminalIdChange = (id: string) => {
    defaultTerminal.terminalTypeId = id;
    onChange("update", defaultTerminal, row);
  };

  const onQuantityChange = (item: number) => {
    defaultTerminal.number = item;
    onChange("update", defaultTerminal, row);
  };

  const onDirectionChange = (item: ConnectorType) => {
    defaultTerminal.connectorType = item;
    onChange("update", defaultTerminal, row);
  };

  return (
    <AddTerminalElement>
      <NummericValueInput
        value={defaultTerminal.number.toString()}
        onChange={(item: number) => onQuantityChange(item)}
      />

      <img src={HelpIcon} alt="help" className="help-icon" />

      <SearchDropDown
        value={defaultTerminal.terminalTypeId}
        onChange={(id: string) => onTerminalIdChange(id)}
        placeHolder={TextResources.TypeEditor_Search}
        list={terminals as SearchDropDownItem[]}
      />

      <img src={HelpIcon} alt="help" className="help-icon" />

      <DirectionalDropdown
        onChange={(item: ConnectorType) => onDirectionChange(item)}
        value={defaultTerminal.connectorType}
      />
      <button onClick={() => onChange("remove", defaultTerminal, row)}>
        <img src={DeleteIcon} alt="delete" className="delete-icon" />
      </button>
    </AddTerminalElement>
  );
};

export default AddTerminal;
