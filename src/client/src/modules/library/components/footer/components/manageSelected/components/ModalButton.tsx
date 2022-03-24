import { Dispatch } from "redux";
import { RightArrowIcon } from "../../../../../../../assets/icons/arrow";
import { TextResources } from "../../../../../../../assets/text/TextResources";
import { Button } from "../../../../../../../compLibrary/buttons";
import { CollectionsActions, LibItem } from "../../../../../../../models";
import { OnManageCollection } from "../handlers";
import { ModalButtonsWrapper } from "../../styled/ModalButtonsWrapper";

interface Props {
  collectionState: CollectionsActions;
  onExit: () => void;
  selectedTypes: LibItem[];
  selectedCollections: string[];
  setSelectedTypes: (types: LibItem[]) => void;
  setCollectionState: (action: CollectionsActions) => void;
  setAddSelectedToCollection: (open: boolean) => void;
  dispatch: Dispatch;
}

export const ModalButton = ({
  collectionState,
  onExit,
  selectedTypes,
  setSelectedTypes,
  selectedCollections,
  setCollectionState,
  setAddSelectedToCollection,
  dispatch,
}: Props) => (
  <ModalButtonsWrapper>
    <Button onClick={onExit} text={TextResources.CANCEL} />
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
          onExit();
        }}
        text={TextResources.LIBRARY_MODAL_ADD_COLLECTION}
      />
    )}
  </ModalButtonsWrapper>
);
