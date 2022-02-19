import { useState } from "react";
import { Dispatch } from "redux";
import { ColoredCollections } from "../../../../../../assets/icons/library";
import { TextResources } from "../../../../../../assets/text";
import { Modal } from "../../../../../../compLibrary/modal/Modal";
import { InfoModalContent } from "../../../../../../compLibrary/modal/variants/info/InfoModalContent";
import { ModalList } from "./components/ModalList";
import { Collection, CollectionsActions, LibItem } from "../../../../../../models";
import { ModalListHeader } from "./ManageSelectedTypes.styled";
import { ModalButton } from "./components/ModalButton";
import { CreateCollectionComponent } from "./components/CreateCollectionComponent";

interface Props {
  isOpen: boolean;
  onExit: (isOpen: boolean) => void;
  selectedTypes: LibItem[];
  setSelectedTypes: (types: LibItem[]) => void;
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
      <InfoModalContent title={TextResources.Library_Modal_Create_Collection} icon={ColoredCollections}>
        <CreateCollectionComponent
          collectionName={collectionName}
          setCollectionName={setCollectionName}
          selectedTypes={selectedTypes}
          dispatch={dispatch}
        />
        <ModalListHeader>{TextResources.Library_Modal_Select_Collection}</ModalListHeader>
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
