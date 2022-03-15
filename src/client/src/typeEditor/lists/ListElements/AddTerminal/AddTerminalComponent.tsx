import { ConnectorType, TerminalType, TerminalTypeItem } from "../../../../models";
import { TerminalElementWrapper } from "../../../styled";
import { CloseIcon } from "../../../../assets/icons/close";
import { OnDirectionChange, OnQuantityChange, OnTerminalIdChange } from "./handlers";
import { DirectionalDropdown, SearchDropDown } from "../../../../compLibrary";
import { NumericValueInput } from "../../../../compLibrary/input/text";
import { TypeEditorTextResources } from "../../../assets/TypeEditorTextResources";

interface Props {
  terminals: TerminalType[];
  defaultTerminal: TerminalTypeItem;
  // eslint-disable-next-line @typescript-eslint/ban-types
  onChange: Function;
}

const AddTerminal = ({ terminals, defaultTerminal, onChange }: Props) => (
  <TerminalElementWrapper>
    <NumericValueInput
      value={defaultTerminal.number.toString()}
      onChange={(item: number) => OnQuantityChange(item, defaultTerminal, onChange)}
    />
    <SearchDropDown
      value={defaultTerminal.terminalTypeId}
      onChange={(item) => OnTerminalIdChange(item, defaultTerminal, onChange)}
      placeHolder={TypeEditorTextResources.SEARCH}
      list={terminals}
    />
    <DirectionalDropdown
      onChange={(item: number) => OnDirectionChange(item, defaultTerminal, onChange)}
      value={defaultTerminal ? Number(defaultTerminal.connectorType) : Number(ConnectorType.Input)}
    />
    <button onClick={() => onChange("remove", defaultTerminal)}>
      <img src={CloseIcon} alt="delete" className="delete-icon" />
    </button>
  </TerminalElementWrapper>
);

export default AddTerminal;
