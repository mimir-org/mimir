import { Checkbox } from "../../inputs/Checkbox";
import { ListElem } from "../../../../../compLibrary";
import { HelpIcon } from "../../../../../assets/icons/common";

interface Props {
  attribute: any;
}

export const AttributesListElement = ({ attribute }: Props) => {
  return (
    <ListElem>
      <Checkbox label="attribute" id={attribute[1].id} />
      <p>
        <span>{attribute[1].source.name} </span>
        <span>{attribute[1].entity} - </span>
        <span>{attribute[1].qualifier.name}, </span>
        <span>{attribute[1].condition.name}</span>
        <span></span>
      </p>
      <img src={HelpIcon} alt="help" />
    </ListElem>
  );
};

export default AttributesListElement;
