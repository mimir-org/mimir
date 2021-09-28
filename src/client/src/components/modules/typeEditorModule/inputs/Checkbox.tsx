import "./checkbox.scss";

export enum Label {
  attributeTypes = 0,
  Terminals = 1,
  compositeTypes = 2,
}
interface Props {
  id: string;
  label: Label;
  defaultValue?: any;
  onChange: Function;
}

export const Checkbox = ({ id, label, defaultValue, onChange }: Props) => {
  const isSelected = () => {
    if (label === Label.attributeTypes || label === Label.compositeTypes) {
      return defaultValue?.includes(id);
    } else if (label === Label.Terminals) {
      return defaultValue?.some((a) => a.key === id);
    }
  };

  const onCheckboxChange = () => {
    if (label === Label.attributeTypes || label === Label.compositeTypes) {
      let array = defaultValue;
      if (id && isSelected()) {
        array = array.filter((a) => a !== id);
      } else if (id && !isSelected() && array) {
        array.push(id);
      }
      onChange(Label[label], array);
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
