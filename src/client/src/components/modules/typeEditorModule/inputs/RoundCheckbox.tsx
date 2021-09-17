import "./roundcheckbox.scss";

export enum ListType {
  Rds = 0,
  Terminals = 1,
}
interface Props {
  id: string;
  listType: ListType;
  defaultValue?: any;
  onChange: Function;
}

export const RoundCheckbox = ({
  id,
  listType,
  defaultValue,
  onChange,
}: Props) => {
  let isSelected = () => {
    if (listType === ListType.Rds) return defaultValue === id;
    if (listType === ListType.Terminals) return defaultValue === id;
  };

  const onCheckboxChange = () => {
    if (id !== "" && id) {
      if (listType === ListType.Rds) onChange("rdsId", id);
      if (listType === ListType.Terminals) onChange(onChange(id));
    }
  };

  return (
    <label className={"roundcheckbox"}>
      <input
        type="checkbox"
        checked={isSelected()}
        id={id}
        onChange={onCheckboxChange}
      />
      <span className="checked"></span>
      <label htmlFor={id} />
    </label>
  );
};

export default RoundCheckbox;
