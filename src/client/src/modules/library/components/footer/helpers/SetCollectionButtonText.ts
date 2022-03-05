import { TextResources } from "../../../../../assets/text/TextResources";
import { CollectionsActions } from "../../../../../models";

const SetCollectionButtonText = (collectionState: CollectionsActions) => {
  return collectionState === CollectionsActions.ManageType
    ? TextResources.Library_Manage_Collections_Button_Add
    : TextResources.Library_Manage_Collections_Button_Manage;
};

export default SetCollectionButtonText;
