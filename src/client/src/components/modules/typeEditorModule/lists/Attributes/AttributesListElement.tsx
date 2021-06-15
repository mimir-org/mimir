import { Checkbox } from "../../inputs/Checkbox";
import { ListElem } from "../../../../../componentLibrary";
import { HelpIcon } from "../../../../../assets/icons/common";

interface Props {
  name: string;
}

export const AttributesListElement = ({ name }: Props) => {
  return (
    <ListElem>
      <Checkbox />
      {name}
      <img src={HelpIcon} alt="help" />
    </ListElem>
  );
};

export default AttributesListElement;
