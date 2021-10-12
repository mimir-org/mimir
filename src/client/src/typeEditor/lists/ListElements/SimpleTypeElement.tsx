import { CompositeType } from "../../../models";
import { Checkbox, Label } from "../../inputs/Checkbox";
import { ListElem } from "../../../compLibrary";

interface Props {
  simpleType: CompositeType;
  onChange: Function;
  defaultValue?: string[];
}

export const SimpleTypeElement = ({ simpleType, onChange, defaultValue }: Props) => {
  const isSelected = defaultValue?.includes(simpleType.id);
  return (
    <ListElem isSelected={isSelected}>
      <Checkbox
        id={simpleType.id}
        name={simpleType.name}
        label={Label.compositeTypes}
        defaultValue={defaultValue}
        onChange={onChange}
      />
    </ListElem>
  );
};

export default SimpleTypeElement;
