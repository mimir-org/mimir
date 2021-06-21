import { SearchTerminalMediaType } from "./SearchTerminalMediaType";
import { DirectionDropdown } from "./DirectionDropdown";
import { AddTerminalElement } from "../../../styled";
import { NumericInput } from "../../../../../../compLibrary";
import { HelpIcon } from "../../../../../../assets/icons/common";

interface Props {
  terminals: any;
}

export const AddTerminal = ({ terminals }: Props) => {
  //   const [terminalQuantity, setTerminalQuantity] = useState(0);

  const numberInput = (e) => {
    // setTerminalQuantity(e.target.value);
  };
  return (
    <AddTerminalElement>
      <NumericInput>
        <label className={"quantity"}>
          <input type="number" min="0" placeholder="0" onChange={numberInput} />
          <span className="number"></span>
        </label>
      </NumericInput>
      <SearchTerminalMediaType terminals={terminals} />
      <img src={HelpIcon} alt="help" />
      <DirectionDropdown />
    </AddTerminalElement>
  );
};

export default AddTerminal;
