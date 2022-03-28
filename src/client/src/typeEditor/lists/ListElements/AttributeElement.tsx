import { AttributeType, Discipline } from "../../../models";
import { ListCategoryElement, ListElem, ListElementCategoryWrapper } from "../../styled";
import { CheckboxContainer, Label } from "../../inputs/CheckboxContainer";
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
          <CheckboxContainer
            id={element.id}
            name={element.description}
            label={Label.attributeTypes}
            defaultValue={defaultValue}
            onChange={onChange}
          />
        </ListElem>
      ))}
    </ListElementCategoryWrapper>
  );
};

export default AttributeElement;
