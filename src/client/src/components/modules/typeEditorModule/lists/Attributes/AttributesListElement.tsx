import { Checkbox } from "../../inputs/Checkbox";
import { ListElem } from "../../../../../componentLibrary";
import { HelpIcon } from "../../../../../assets/icons/common";

export const AttributesListElement = () => {
  return (
    <ListElem>
      <Checkbox />
      Attribute name
      <img src={HelpIcon} alt="help" />
    </ListElem>
  );
};

export default AttributesListElement;
