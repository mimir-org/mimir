import { AttributeType, Discipline } from "../../../models";
import { ListElem } from "../../../compLibrary";
import { ListElementCategoryWrapper, ListCategoryElement, SquareBox } from "../../styled";
import { SquareCheckbox, Label } from "../../inputs/SquareCheckbox";
import { OnPropertyChangeFunction } from "../../types";

interface Props {
  discipline: Discipline;
  attributes: AttributeType[];
  defaultValue?: string[];
  onChange: OnPropertyChangeFunction;
}

export const AttributeElement = ({ discipline, attributes, defaultValue, onChange }: Props) => {
  const isSelected = (id: string) => {
    return defaultValue?.includes(id);
  };
  return (
    <ListElementCategoryWrapper>
      <ListCategoryElement>{discipline && <p>{Discipline[discipline]}</p>}</ListCategoryElement>
      {attributes.map((element) => (
        <ListElem key={element.id} isSelected={isSelected(element.id)}>
          <SquareBox>
            <SquareCheckbox
              id={element.id}
              name={element.description}
              label={Label.attributeTypes}
              defaultValue={defaultValue}
              onChange={onChange}
            />
          </SquareBox>
        </ListElem>
      ))}
    </ListElementCategoryWrapper>
  );
};

export default AttributeElement;
