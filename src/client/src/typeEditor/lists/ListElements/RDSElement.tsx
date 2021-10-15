import { ListType, RoundCheckbox } from "../../inputs/RoundCheckbox";
import { Rds } from "../../../models";
import { ListElementCategoryWrapper, RdsCategoryElement, RdsListElement, RoundBox } from "../../styled";

interface Props {
  category: string;
  rds: Rds[];
  defaultValue: string;
  onChange: Function;
}

export const RDSElement = ({ category, rds, defaultValue, onChange }: Props) => {
  return (
    <ListElementCategoryWrapper>
      <RdsCategoryElement>
        <p>{category}</p>
      </RdsCategoryElement>
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
