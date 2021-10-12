import { ListType, RoundCheckbox } from "../../inputs/RoundCheckbox";
import { Rds } from "../../../../../models";
import { ListElementCategory, RdsListElement } from "../../styled";

interface Props {
  category: string;
  rds: Rds[];
  defaultValue: string;
  onChange: Function;
}

export const RDSElement = ({ category, rds, defaultValue, onChange }: Props) => {
  return (
    <ListElementCategory>
      <p className="rds-category">{category}</p>
      {rds.map((element) => (
        <RdsListElement key={element.id} isSelected={element.id === defaultValue}>
          <RoundCheckbox
            id={element.id}
            label={element.code + " - " + element.name}
            listType={ListType.Rds}
            onChange={(key, data) => onChange(key, data)}
            defaultValue={defaultValue}
          />
        </RdsListElement>
      ))}
    </ListElementCategory>
  );
};
export default RDSElement;
