import "./roundcheckbox.scss";

export enum ListType {
  Rds = 0,
  Terminals = 1,
}
interface Props {
  id: string;
  listType: ListType;
  defaultValue?: any;
  checked?: any;
  onChange: Function;
}

export const RoundCheckbox = ({
  id,
  listType,
  defaultValue,
  checked,
  onChange,
}: Props) => {
  let rdsIsSelected = listType === ListType.Rds && defaultValue === id;
  let terminalIsSelected = listType === ListType.Terminals && checked;

  const onCheckboxChange = () => {
    if (id !== "" && id) {
      if (listType === ListType.Rds) onChange("rdsId", id);
      if (listType === ListType.Terminals)
        onChange("terminalTypeId", defaultValue);
    }
  };

  return (
    <label className={"roundcheckbox"}>
      <input
        type="checkbox"
        checked={listType === ListType.Rds ? rdsIsSelected : terminalIsSelected}
        id={id}
        onChange={onCheckboxChange}
      />
      <span className="checked"></span>
      <label htmlFor={id} />
    </label>
  );
};

export default RoundCheckbox;
