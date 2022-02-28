import { Dispatch } from "redux";
import { CollectionsActions } from "../../../../../../../models";
import { addToCollections } from "../../../../../../../redux/store/library/librarySlice";
import { addToCollectionsTypes } from "../../../../../../../redux/store/library/types";

const OnManageCollection = (
  selectedTypes: string[],
  selectedCollections: string[],
  setCollectionState: (action: CollectionsActions) => void,
  setSelectedTypes: (types: string[]) => void,
  setAddSelectedToCollection: (open: boolean) => void,
  dispatch: Dispatch
) => {
  const collections: addToCollectionsTypes = {
    types: selectedTypes,
    collectionIds: selectedCollections,
  };
  dispatch(addToCollections(collections));
  setAddSelectedToCollection(false);
  setCollectionState(CollectionsActions.ManageCollection);
  setSelectedTypes([]);
};

export default OnManageCollection;
