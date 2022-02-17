import Moment from "react-moment";
import { TextResources } from "../../../../../../../assets/text";
import { Collection } from "../../../../../../../models";
import { MultiSelectCheckbox } from "./MultiSelectCheckbox";
import {
  ModalListContent,
  ModalListColumnText,
  ModalListElementsContainer,
  ModalListElement,
  ModalListElementText,
} from "./ModalList.styled";

interface Props {
  collections: Collection[];
  selectedCollections: string[];
  setSelectedCollections: (select: string[]) => void;
}

export const ModalList = ({ collections, selectedCollections, setSelectedCollections }: Props) => {
  const isSelected = (id: string): boolean => {
    return selectedCollections?.includes(id);
  };
  const onCheckboxChange = (id: string) => {
    let temp = [...selectedCollections];
    if (isSelected(id)) temp = temp.filter((a) => a !== id);
    else if (!isSelected(id) && temp) temp.push(id);
    setSelectedCollections(temp);
  };

  return (
    <ModalListContent>
      <ModalListColumnText>{TextResources.Library_Modal_Collection_Created}</ModalListColumnText>
      <ModalListElementsContainer>
        {collections?.map((c) => {
          return (
            <ModalListElement key={c.id} isSelected={isSelected(c.id)}>
              <MultiSelectCheckbox id={c.id} isChecked={isSelected(c.id)} onChange={() => onCheckboxChange(c.id)} />
              <ModalListElementText>{c.name}</ModalListElementText>
              <ModalListElementText>{c.name}</ModalListElementText>
              <ModalListElementText>
                <Moment format="DD/MM/YYYY ">{c.created}</Moment>
              </ModalListElementText>
            </ModalListElement>
          );
        })}
      </ModalListElementsContainer>
    </ModalListContent>
  );
};
