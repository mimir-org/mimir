import { Checkbox } from "../../inputs/Checkbox";
import { ListElem } from "../../../../../componentLibrary";
import { HelpIcon } from "../../../../../assets/icons/common";

interface Props {
  source: string;
  entity: string;
  qualifier: string;
  condition: string;
}

export const AttributesListElement = ({
  source,
  entity,
  qualifier,
  condition,
}: Props) => {
  return (
    <ListElem>
      <Checkbox />
      {source}, {entity}, - {qualifier}, {condition}
      <img src={HelpIcon} alt="help" />
    </ListElem>
  );
};

export default AttributesListElement;
