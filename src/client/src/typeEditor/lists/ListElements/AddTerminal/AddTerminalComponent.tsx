import { TerminalTypeItem, ConnectorType, TerminalType } from "../../../../models";
import { TerminalElementWrapper } from "../../../styled";
import { TextResources } from "../../../../assets/text";
import { CloseIcon } from "../../../../assets/icons/close";
import { OnTerminalIdChange, OnDirectionChange, OnQuantityChange } from "./handlers";
import { SearchDropDown, DirectionalDropdown } from "../../../../compLibrary";
import { NumericValueInput } from "../../../../compLibrary/input/text";
import { SearchDropDownItem } from "../../../../compLibrary/dropdown/SearchDropDown";

interface Props {
  terminals: TerminalType[];
  defaultTerminal: TerminalTypeItem;
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
      placeHolder={TextResources.TypeEditor_Search}
      list={terminals as SearchDropDownItem[]}
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
