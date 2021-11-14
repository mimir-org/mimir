import { Checkbox } from "../../compLibrary/checkbox/common";
import { AttributeName } from "./styled";

export enum Label {
  attributeTypes = 0,
  Terminals = 1,
  compositeTypes = 2,
}

interface Props {
  id: string;
  name?: string;
  label: Label;
  defaultValue?: any;
  onChange: Function;
}

export const CheckboxContainer = ({ id, name, label, defaultValue, onChange }: Props) => {
  const isSelected = (): boolean => {
    if (label === Label.attributeTypes || label === Label.compositeTypes) return defaultValue?.includes(id);
    if (label === Label.Terminals) return defaultValue?.some((a) => a.key === id);
  };

  const onCheckboxChange = () => {
    if (label === Label.attributeTypes || label === Label.compositeTypes) {
      let array = [...defaultValue];
      if (id && isSelected()) array = array.filter((a) => a !== id);
      else if (id && !isSelected() && array) array.push(id);
      onChange(Label[label], array);
    } else if (label === Label.Terminals) onChange();
  };

  return (
    <label>
      <Checkbox isChecked={isSelected()} onChange={() => onCheckboxChange()} />
      <AttributeName htmlFor={id} onClick={() => onCheckboxChange()}>
        {name}
      </AttributeName>
    </label>
  );
};

export default CheckboxContainer;
