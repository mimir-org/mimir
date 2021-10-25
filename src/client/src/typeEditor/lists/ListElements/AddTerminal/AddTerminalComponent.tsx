import { TerminalTypeItem, ConnectorType, TerminalType } from "../../../../models";
import { AddTerminalElement } from "../../../styled";
import { TextResources } from "../../../../assets/text";
import { CloseIcon } from "../../../../assets/icons/close";
import { NumericValueInput, SearchDropDown, SearchDropDownItem, DirectionalDropdown } from "../../../../compLibrary";

interface Props {
  terminals: TerminalType[];
  defaultTerminal: TerminalTypeItem;
  onChange: Function;
}

const AddTerminal = ({ terminals, defaultTerminal, onChange }: Props) => {
  const onTerminalIdChange = (id: string, name: string) => {
    defaultTerminal.terminalTypeId = id;
    defaultTerminal.name = name;
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

  return (
    <AddTerminalElement>
      <NumericValueInput value={defaultTerminal.number.toString()} onChange={(item: number) => onQuantityChange(item)} />
      <SearchDropDown
        value={defaultTerminal.terminalTypeId}
        onChange={(id: string, name: string) => onTerminalIdChange(id, name)}
        placeHolder={TextResources.TypeEditor_Search}
        list={terminals as SearchDropDownItem[]}
      />
      <DirectionalDropdown
        onChange={(item: number) => onDirectionChange(item)}
        value={defaultTerminal ? Number(defaultTerminal.connectorType) : Number(ConnectorType.Input)}
      />
      <button onClick={() => onChange("remove", defaultTerminal)}>
        <img src={CloseIcon} alt="delete" className="delete-icon" />
      </button>
    </AddTerminalElement>
  );
};

export default AddTerminal;
