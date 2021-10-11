import { ListType, RoundCheckbox } from "../../inputs/RoundCheckbox";
import { ListElem } from "../../../compLibrary";

interface Props {
  id: string;
  name: string;
  defaultValue: string;
  onChange: Function;
}

export const RDSElement = ({ id, name, defaultValue, onChange }: Props) => {
  const isSelected = id === defaultValue;
  return (
    <ListElem isSelected={isSelected}>
      <RoundCheckbox
        id={id}
        label={name}
        listType={ListType.Rds}
        onChange={(key, data) => onChange(key, data)}
        defaultValue={defaultValue}
      />
    </ListElem>
  );
};
export default RDSElement;
