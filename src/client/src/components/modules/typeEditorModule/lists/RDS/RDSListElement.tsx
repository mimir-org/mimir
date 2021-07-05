import { RoundCheckbox } from "../../inputs/RoundCheckbox";
import { ListElem } from "../../../../../compLibrary";
import { HelpIcon } from "../../../../../assets/icons/common";

interface Props {
  id: string;
  name: string;
}

export const RDSListElement = ({ id, name }: Props) => (
  <ListElem>
    <RoundCheckbox id={id} name={name} label="rds" />
    <p>{name}</p>
    <img src={HelpIcon} alt="help" />
  </ListElem>
);

export default RDSListElement;
