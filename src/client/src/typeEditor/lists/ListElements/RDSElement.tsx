import { ListType, RoundCheckbox } from "../../inputs/RoundCheckbox";
import { Rds } from "../../../models";
import { ListElementCategoryWrapper, ListCategoryElement, RdsListElement, RoundBox } from "../../styled";
import { OnPropertyChangeFunction } from "../../types";

interface Props {
  category: string;
  rds: Rds[];
  defaultValue: string;
  onChange: OnPropertyChangeFunction;
}

export const RDSElement = ({ category, rds, defaultValue, onChange }: Props) => {
  return (
    <ListElementCategoryWrapper>
      <ListCategoryElement>
        <p>{category}</p>
      </ListCategoryElement>
      {rds.map((element) => (
        <RdsListElement key={element.id} isSelected={element.id === defaultValue}>
          <RoundBox>
            <RoundCheckbox
              id={element.id}
              label={element.code + " - " + element.name}
              listType={ListType.Rds}
              onChange={(key, data) => onChange(key, data)}
              defaultValue={defaultValue}
            />
          </RoundBox>
        </RdsListElement>
      ))}
    </ListElementCategoryWrapper>
  );
};
export default RDSElement;
