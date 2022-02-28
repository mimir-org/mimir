import { Dispatch } from "redux";
import { RightArrowIcon } from "../../../../../../../assets/icons/arrow";
import { TextResources } from "../../../../../../../assets/text";
import { Button } from "../../../../../../../compLibrary/buttons";
import { CollectionsActions } from "../../../../../../../models";
import { OnManageCollection } from "../handlers";
import { ModalButtonsWrapper } from "../../styled/ModalButtonsWrapper";

interface Props {
  collectionState: CollectionsActions;
  isOpen: boolean;
  onExit: (isOpen: boolean) => void;
  selectedTypes: string[];
  selectedCollections: string[];
  setSelectedTypes: (types: string[]) => void;
  setCollectionState: (action: CollectionsActions) => void;
  setAddSelectedToCollection: (open: boolean) => void;
  dispatch: Dispatch;
}

export const ModalButton = ({
  collectionState,
  isOpen,
  onExit,
  selectedTypes,
  setSelectedTypes,
  selectedCollections,
  setCollectionState,
  setAddSelectedToCollection,
  dispatch,
}: Props) => (
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
);
