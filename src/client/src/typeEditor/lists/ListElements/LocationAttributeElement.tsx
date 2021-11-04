import { AttributeType } from "../../../models";
import { ListElem } from "../../../compLibrary";
import { SquareBox } from "../../styled";
import { SquareCheckbox, Label } from "../../inputs/SquareCheckbox";
import { OnPropertyChangeFunction } from "../../types";

interface Props {
  attribute: AttributeType;
  defaultValue?: string[];
  onChange: OnPropertyChangeFunction;
}

export const AttributeElement = ({ attribute, defaultValue, onChange }: Props) => {
  const isSelected = defaultValue?.includes(attribute.id);
  return (
    <ListElem isSelected={isSelected}>
      <SquareBox>
        <SquareCheckbox
          id={attribute.id}
          name={attribute.description}
          label={Label.attributeTypes}
          defaultValue={defaultValue}
          onChange={onChange}
        />
      </SquareBox>
    </ListElem>
  );
};

export default AttributeElement;
