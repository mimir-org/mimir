import { TextResources } from "../../../../../assets/text/TextResources";
import { CollectionsActions } from "../../../../../models";

const SetCollectionButtonText = (collectionState: CollectionsActions) => {
  return collectionState === CollectionsActions.ManageType
    ? TextResources.LIBRARY_MANAGE_COLLECTIONS_BUTTON_ADD
    : TextResources.LIBRARY_MANAGE_COLLECTIONS_BUTTON_MANAGE;
};

export default SetCollectionButtonText;
