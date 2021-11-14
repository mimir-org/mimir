import { CompositeType } from "../../../models";
import { ListElem } from "../../../compLibrary";
import { CheckboxContainer, Label } from "../../inputs/CheckboxContainer";
import { OnPropertyChangeFunction } from "../../types";

interface Props {
  simpleType: CompositeType;
  onChange: OnPropertyChangeFunction;
  defaultValue?: string[];
}

export const SimpleTypeElement = ({ simpleType, onChange, defaultValue }: Props) => (
  <ListElem isSelected={defaultValue?.includes(simpleType.id)}>
    <CheckboxContainer
      id={simpleType.id}
      name={simpleType.name}
      label={Label.compositeTypes}
      defaultValue={defaultValue}
      onChange={onChange}
    />
  </ListElem>
);

export default SimpleTypeElement;
