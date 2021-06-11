import { RoundCheckbox } from "../../inputs/RoundCheckbox";
import { ListElem } from "../../../../../componentLibrary";
import { HelpIcon } from "../../../../../assets/icons/common";

interface Props {
  name: string;
}

export const RDSListElement = ({ name }: Props) => {
  return (
    <ListElem>
      <RoundCheckbox />
      <p>{name}</p>
      <img src={HelpIcon} alt="help" />
    </ListElem>
  );
};

export default RDSListElement;
