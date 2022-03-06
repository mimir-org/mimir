import { AttributeType } from "../../../models";
import { CheckboxContainer, Label } from "../../inputs/CheckboxContainer";
import { ListElem } from "../../styled";
import { OnPropertyChangeFunction } from "../../types";

interface Props {
  attribute: AttributeType;
  defaultValue?: string[];
  onChange: OnPropertyChangeFunction;
}

export const AttributeElement = ({ attribute, defaultValue, onChange }: Props) => (
  <ListElem isSelected={defaultValue?.includes(attribute.id)}>
    <CheckboxContainer
      id={attribute.id}
      name={attribute.description}
      label={Label.attributeTypes}
      defaultValue={defaultValue}
      onChange={onChange}
    />
  </ListElem>
);

export default AttributeElement;
