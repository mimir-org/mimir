import { ListType, RoundCheckbox } from "../../inputs/RoundCheckbox";
import { ListElem } from "../../../../../compLibrary";
import { HelpIcon } from "../../../../../assets/icons/common";

interface Props {
  id: string;
  name: string;
  defaultValue: string;
  onChange: Function;
}

export const RDSElement = ({ id, name, defaultValue, onChange }: Props) => (
  <ListElem>
    <RoundCheckbox
      id={id}
      listType={ListType.Rds}
      onChange={(key, data) => onChange(key, data)}
      defaultValue={defaultValue}
    />
    <p onClick={() => onChange("rdsId", id)}>{name}</p>
    <img src={HelpIcon} alt="help" />
  </ListElem>
);

export default RDSElement;
