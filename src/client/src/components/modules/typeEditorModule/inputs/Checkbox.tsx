import "./checkbox.scss";

export enum Label {
  Attributes = 0,
  Terminals = 1,
}
interface Props {
  id: string;
  label: Label;
  defaultValue?: any;
  onChange: Function;
}

export const Checkbox = ({ id, label, defaultValue, onChange }: Props) => {
  const isSelected = () => {
    if (label === Label.Attributes) {
      return defaultValue.includes(id);
    } else if (label === Label.Terminals) {
      return defaultValue.some((a) => a.key === id);
    }
  };

  const onCheckboxChange = () => {
    if (label === Label.Attributes) {
      let array = defaultValue;
      if (id && isSelected()) {
        array = array.filter((a) => a !== id);
      } else if (id && !isSelected() && array) {
        array.push(id);
      }
      onChange("attributeTypes", array);
    } else if (label === Label.Terminals) {
      onChange(onChange);
    }
  };

  return (
    <label className={"squarecheckbox"}>
      <input
        type="checkbox"
        defaultChecked={isSelected()}
        id={id}
        onChange={onCheckboxChange}
      />
      <span className="scheckmark"></span>
      <label htmlFor={id}></label>
    </label>
  );
};

export default Checkbox;
