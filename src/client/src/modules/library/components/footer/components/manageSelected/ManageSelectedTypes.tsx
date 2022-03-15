import { useState } from "react";
import { Dispatch } from "redux";
import { ColoredCollections } from "../../../../../../assets/icons/library";
import { TextResources } from "../../../../../../assets/text/TextResources";
import { Modal } from "../../../../../../compLibrary/modal/Modal";
import { InfoModalContent } from "../../../../../../compLibrary/modal/variants/info/InfoModalContent";
import { ModalList } from "./components/ModalList";
import { Collection, CollectionsActions } from "../../../../../../models";
import { ModalListHeader } from "./ManageSelectedTypes.styled";
import { ModalButton } from "./components/ModalButton";
import { CreateCollectionComponent } from "./components/CreateCollectionComponent";

interface Props {
  isOpen: boolean;
  onExit: (isOpen: boolean) => void;
  selectedTypes: string[];
  setSelectedTypes: (types: string[]) => void;
  collections: Collection[];
  collectionState: CollectionsActions;
  setCollectionState: (action: CollectionsActions) => void;
  setAddSelectedToCollection: (open: boolean) => void;
  dispatch: Dispatch;
}

export const ManageSelectedTypes = ({
  isOpen,
  onExit,
  selectedTypes,
  setSelectedTypes,
  collections,
  collectionState,
  setCollectionState,
  setAddSelectedToCollection,
  dispatch,
}: Props) => {
  const [collectionName, setCollectionName] = useState("");
  const [selectedCollections, setSelectedCollections] = useState([] as string[]);

  return (
    <Modal isBlurred isOpen={isOpen} onExit={() => onExit(!isOpen)}>
      <InfoModalContent title={TextResources.LIBRARY_MODAL_CREATE_COLLECTION} icon={ColoredCollections}>
        <CreateCollectionComponent collectionName={collectionName} setCollectionName={setCollectionName} dispatch={dispatch} />
        <ModalListHeader>{TextResources.LIBRARY_MODAL_SELECT_COLLECTION}</ModalListHeader>
        <ModalList
          collections={collections}
          selectedCollections={selectedCollections}
          setSelectedCollections={setSelectedCollections}
        />
        <ModalButton
          collectionState={collectionState}
          isOpen={isOpen}
          onExit={onExit}
          selectedTypes={selectedTypes}
          selectedCollections={selectedCollections}
          setSelectedTypes={setSelectedTypes}
          setCollectionState={setCollectionState}
          setAddSelectedToCollection={setAddSelectedToCollection}
          dispatch={dispatch}
        />
      </InfoModalContent>
    </Modal>
  );
};
