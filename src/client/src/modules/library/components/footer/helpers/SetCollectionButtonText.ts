import { TextResources } from "../../../../../assets/text/TextResources";
import { CollectionsActions } from "../../../../../models";

const SetCollectionButtonText = (collectionState: CollectionsActions) => {
  return collectionState === CollectionsActions.ManageType
    ? TextResources.MANAGE_COLLECTIONS_ADD
    : TextResources.MANAGE_COLLECTIONS_BUTTON;
};

export default SetCollectionButtonText;
