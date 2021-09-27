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
  terminalId: string;
  terminals: any[];
  defaultTerminal: TerminalTypeItem;
  onChange: Function;
}

const AddTerminal = ({
  terminalId,
  terminals,
  defaultTerminal,
  onChange,
}: Props) => {
  const onTerminalIdChange = (id: string) => {
    defaultTerminal.terminalTypeId = id;
    onChange("update", defaultTerminal, terminalId);
  };

  const onQuantityChange = (item: number) => {
    defaultTerminal.number = item;
    onChange("update", defaultTerminal, terminalId);
  };

  const onDirectionChange = (item: number) => {
    defaultTerminal.connectorType = Number(item);
    onChange("update", defaultTerminal, terminalId);
  };

  return (
    <AddTerminalElement>
      <NummericValueInput
        value={defaultTerminal.number.toString()}
        onChange={(item: number) => onQuantityChange(item)}
      />

      <img src={HelpIcon} alt="help" />

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
      <button onClick={() => onChange("remove", defaultTerminal, terminalId)}>
        <img src={DeleteIcon} alt="delete" className="delete-icon" />
      </button>
    </AddTerminalElement>
  );
};

export default AddTerminal;
