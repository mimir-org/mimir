import { AttributeType } from "../../../../../models";
import { Checkbox, Label } from "../../inputs/Checkbox";
import { ListElem } from "../../../../../compLibrary";
import { HelpIcon } from "../../../../../assets/icons/common";

interface Props {
  attribute: AttributeType;
  onChange: Function;
  defaultValue?: string[];
}

export const AttributeElement = ({ attribute, onChange, defaultValue }: Props) => {
  return (
    <ListElem>
      <Checkbox id={attribute.id} label={Label.attributeTypes} defaultValue={defaultValue} onChange={onChange} />
      <p>
        <span>{attribute.description}</span>
      </p>
      <img src={HelpIcon} alt="help" />
    </ListElem>
  );
};

export default AttributeElement;
