import { OnPropertyChangeFunction } from "../types";

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

export const RadioButton = ({ id, label, listType, defaultValue, checked, onChange }: Props) => {
  const rdsIsSelected = listType === ListType.Rds && defaultValue === id;
  const terminalIsSelected = listType === ListType.Terminals && checked;

  const onCheckboxChange = () => {
    if (id !== "" && id) {
      if (listType === ListType.Rds) onChange("rdsId", id);
      if (listType === ListType.Terminals) onChange("terminalTypeId", defaultValue);
    }
  };

  return (
    <label className="roundcheckbox">
      <input
        type="checkbox"
        checked={listType === ListType.Rds ? rdsIsSelected : terminalIsSelected}
        id={id}
        onChange={onCheckboxChange}
      />
      <span className="checked"></span>
      <label className="label" htmlFor={id}>
        {label}
      </label>
    </label>
  );
};

export default RadioButton;
