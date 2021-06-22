import { RoundCheckbox } from "../../inputs/RoundCheckbox";
import { ListElem } from "../../../../../compLibrary";
import { HelpIcon } from "../../../../../assets/icons/common";

interface Props {
  id: string;
  name: string;
}

export const RDSListElement = ({ id, name }: Props) => {
  return (
    <ListElem>
      <RoundCheckbox id={id} label={"rds"} />
      <p>{name}</p>
      <img src={HelpIcon} alt="help" />
    </ListElem>
  );
};

export default RDSListElement;
