import Moment from "react-moment";
import { Checkbox } from "../../../../../../../compLibrary/input/checkbox/common/Checkbox";
import { TextResources } from "../../../../../../../assets/text/TextResources";
import { Collection } from "../../../../../../../models";
import { OnCheckboxChange } from "../handlers";
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
  const selected = (id: string) => {
    return selectedCollections?.includes(id);
  };

  return (
    <ModalListContent>
      <ModalListColumnText>{TextResources.COLLECTION_CREATED}</ModalListColumnText>
      <ModalListElementsContainer>
        {collections?.map((c) => {
          return (
            <ModalListElement key={c.id} selected={selected(c.id)}>
              <Checkbox
                id={c.id}
                isChecked={selected(c.id)}
                onChange={() => OnCheckboxChange(c.id, selected, selectedCollections, setSelectedCollections)}
              />
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
