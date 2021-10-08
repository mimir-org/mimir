import { ListType, RoundCheckbox } from "../../inputs/RoundCheckbox";
import { ListElem } from "../../../../../compLibrary";

interface Props {
  id: string;
  name: string;
  code: string;
  defaultValue: string;
  onChange: Function;
}

export const RDSElement = ({ id, code, name, defaultValue, onChange }: Props) => {
  const isSelected = id === defaultValue;
  const rdsLabel = code + " - " + name;
  return (
    <ListElem isSelected={isSelected}>
      <RoundCheckbox
        id={id}
        label={rdsLabel}
        listType={ListType.Rds}
        onChange={(key, data) => onChange(key, data)}
        defaultValue={defaultValue}
      />
    </ListElem>
  );
};
export default RDSElement;
