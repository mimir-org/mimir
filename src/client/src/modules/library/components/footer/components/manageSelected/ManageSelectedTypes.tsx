import { useState } from "react";
import { Dispatch } from "redux";
import { RightArrowIcon } from "../../../../../../assets/icons/arrow";
import { ColoredCollections } from "../../../../../../assets/icons/library";
import { TextResources } from "../../../../../../assets/text";
import { Button } from "../../../../../../compLibrary/buttons";
import { Input } from "../../../../../../compLibrary/input/text";
import { Modal } from "../../../../../../compLibrary/modal/Modal";
import { InfoModalContent } from "../../../../../../compLibrary/modal/variants/info/InfoModalContent";
import { CreateId } from "../../../../../../components/flow/helpers";
import { addCollection } from "../../../../../../redux/store/library/librarySlice";
import { OnManageCollection } from "./handlers/OnManageCollection";
import { ModalList } from "./components/ModalList";
import { ModalButtonsWrapper } from "../styled/ModalButtonsWrapper";
import { Collection, CollectionsActions, LibItem } from "../../../../../../models";
import { CreateCollectionWrapper, CollectionNameInput, ModalListHeader } from "./ManageSelectedTypes.styled";

interface Props {
  isOpen: boolean;
  onExit: (boolean) => void;
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

  const onCreateCollection = () => {
    const collection: Collection = {
      id: CreateId(),
      name: collectionName,
      libItems: selectedTypes,
      created: new Date(),
    };
    dispatch(addCollection(collection));
  };
  return (
    <Modal isBlurred isOpen={isOpen} onExit={() => onExit(!isOpen)}>
      <InfoModalContent title={TextResources.Library_Modal_Create_Collection} icon={ColoredCollections}>
        <CreateCollectionWrapper>
          <CollectionNameInput>
            <Input
              type="text"
              value={collectionName}
              placeholder="Type new Collection name"
              onChange={(e) => setCollectionName(e.target.value)}
            />
          </CollectionNameInput>
          <Button onClick={onCreateCollection} text={"Create and add"} disabled={collectionName === ""} />
        </CreateCollectionWrapper>
        <ModalListHeader>{TextResources.Library_Modal_Select_Collection}</ModalListHeader>
        <ModalList
          collections={collections}
          selectedCollections={selectedCollections}
          setSelectedCollections={setSelectedCollections}
        />
        <ModalButtonsWrapper>
          <Button onClick={() => onExit(!isOpen)} text={TextResources.Library_Modal_Cancel} />
          {collectionState === CollectionsActions.ManageType && (
            <Button
              icon={RightArrowIcon}
              onClick={() => {
                OnManageCollection(
                  selectedTypes,
                  selectedCollections,
                  setCollectionState,
                  setSelectedTypes,
                  setAddSelectedToCollection,
                  dispatch
                );
                onExit(!isOpen);
              }}
              text={TextResources.Library_Modal_Add_Collection}
            />
          )}
        </ModalButtonsWrapper>
      </InfoModalContent>
    </Modal>
  );
};
