import { Dispatch } from "redux";
import { RightArrowIcon } from "../../../../../../../assets/icons/arrow";
import { TextResources } from "../../../../../../../assets/text/TextResources";
import { Button } from "../../../../../../../compLibrary/buttons";
import { CollectionsActions } from "../../../../../../../models";
import { OnManageCollection } from "../handlers";
import { ModalButtonsWrapper } from "../../styled/ModalButtonsWrapper";
import { NodeLibCm } from "@mimirorg/typelibrary-types";

interface Props {
  collectionState: CollectionsActions;
  onExit: () => void;
  selectedTypes: NodeLibCm[];
  selectedCollections: string[];
  setSelectedTypes: (types: NodeLibCm[]) => void;
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
        text={TextResources.ADD_COLLECTION}
      />
    )}
  </ModalButtonsWrapper>
);
