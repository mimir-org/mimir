import { AttributeType } from "../../../../../models";
import { Checkbox, Label } from "../../inputs/Checkbox";
import { ListElem } from "../../../../../compLibrary";

interface Props {
  attribute: AttributeType;
  onChange: Function;
  defaultValue?: string[];
}

export const AttributeElement = ({ attribute, onChange, defaultValue }: Props) => {
  const isSelected = defaultValue?.includes(attribute.id);
  return (
    <ListElem isSelected={isSelected}>
      <Checkbox
        id={attribute.id}
        name={attribute.description}
        label={Label.attributeTypes}
        defaultValue={defaultValue}
        onChange={onChange}
      />
    </ListElem>
  );
};

export default AttributeElement;
