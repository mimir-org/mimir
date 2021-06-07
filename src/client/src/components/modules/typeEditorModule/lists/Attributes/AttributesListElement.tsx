import { Checkbox } from "../../inputs/Checkbox";
import { ListElem } from "../../../../../componentLibrary";
import { HelpIcon } from "../../../../../assets/icons";

interface Props {}

export const AttributesListElement = ({}: Props) => {
  return (
    <ListElem>
      <Checkbox />
      Attribute name
      <img src={HelpIcon} alt="help" />
    </ListElem>
  );
};

export default AttributesListElement;
