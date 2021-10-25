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
  const onTerminalIdChange = (item: TerminalType) => {
    defaultTerminal.terminalTypeId = item.id;
    defaultTerminal.name = item.name;
    defaultTerminal.attributes = item.attributes;
    onChange("update", defaultTerminal);
  };

  const onQuantityChange = (item: number) => {
    defaultTerminal.number = item;
    onChange("update", defaultTerminal);
  };

  const onDirectionChange = (item: number) => {
    defaultTerminal.type = Number(item);
    onChange("update", defaultTerminal);
  };

  return (
    <AddTerminalElement>
      <NumericValueInput value={defaultTerminal.number.toString()} onChange={(item: number) => onQuantityChange(item)} />
      <SearchDropDown
        value={defaultTerminal.terminalTypeId}
        onChange={(item) => onTerminalIdChange(item)}
        placeHolder={TextResources.TypeEditor_Search}
        list={terminals as SearchDropDownItem[]}
      />
      <DirectionalDropdown
        onChange={(item: number) => onDirectionChange(item)}
        value={defaultTerminal ? Number(defaultTerminal.type) : Number(ConnectorType.Input)}
      />
      <button onClick={() => onChange("remove", defaultTerminal)}>
        <img src={CloseIcon} alt="delete" className="delete-icon" />
      </button>
    </AddTerminalElement>
  );
};

export default AddTerminal;
