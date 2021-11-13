import { OnPropertyChangeFunction } from "../types";
import { RadioButton } from "../../compLibrary/radioButton";
import { AttributeName } from "./styled";

export enum ListType {
  Rds = 0,
  Terminals = 1,
}

interface Props {
  id: string;
  label: string;
  listType: ListType;
  defaultValue?: any;
  checked?: any;
  onChange: OnPropertyChangeFunction;
}

export const RadioButtonContainer = ({ id, label, listType, defaultValue, checked, onChange }: Props) => {
  const rdsIsSelected = listType === ListType.Rds && defaultValue === id;
  const terminalIsSelected = listType === ListType.Terminals && checked;

  const onCheckboxChange = () => {
    if (id !== "" && id) {
      if (listType === ListType.Rds) onChange("rdsId", id);
      if (listType === ListType.Terminals) onChange("terminalTypeId", defaultValue);
    }
  };

  return (
    <>
      <RadioButton
        isChecked={listType === ListType.Rds ? rdsIsSelected : terminalIsSelected}
        onChange={() => onCheckboxChange()}
        id={id}
      />
      <AttributeName htmlFor={id}>{label}</AttributeName>
    </>
  );
};

export default RadioButtonContainer;
