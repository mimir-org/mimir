import { RoundCheckbox } from "../../inputs/RoundCheckbox";
import { ListElem } from "../../../../../compLibrary";
import { HelpIcon } from "../../../../../assets/icons/common";

interface Props {
  id: string;
  name: string;
  defaultValue: string;
  onChange: Function;
}

export const RDSListElement = ({ id, name, defaultValue, onChange }: Props) => (
  <ListElem>
    <RoundCheckbox
      id={id}
      name={name}
      label="rds"
      onChange={(key, data) => onChange(key, data)}
      defaultValue={defaultValue}
    />
    <p>{name}</p>
    <img src={HelpIcon} alt="help" />
  </ListElem>
);

export default RDSListElement;
