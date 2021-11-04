import { CompositeType } from "../../../models";
import { ListElem } from "../../../compLibrary";
import { SquareBox } from "../../styled";
import { SquareCheckbox, Label } from "../../inputs/SquareCheckbox";
import { OnPropertyChangeFunction } from "../../types";

interface Props {
  simpleType: CompositeType;
  onChange: OnPropertyChangeFunction;
  defaultValue?: string[];
}

export const SimpleTypeElement = ({ simpleType, onChange, defaultValue }: Props) => {
  const isSelected = defaultValue?.includes(simpleType.id);
  return (
    <ListElem isSelected={isSelected}>
      <SquareBox>
        <SquareCheckbox
          id={simpleType.id}
          name={simpleType.name}
          label={Label.compositeTypes}
          defaultValue={defaultValue}
          onChange={onChange}
        />
      </SquareBox>
    </ListElem>
  );
};

export default SimpleTypeElement;
