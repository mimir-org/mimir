import { RoundCheckbox } from "../../inputs/RoundCheckbox";
import { ListElem } from "../../../../../componentLibrary";
import { HelpIcon } from "../../../../../assets/icons";

interface Props {}

export const RDSListElement = ({}: Props) => {
  return (
    <ListElem>
      <RoundCheckbox />
      RDS String
      <img src={HelpIcon} alt="help" />
    </ListElem>
  );
};

export default RDSListElement;
