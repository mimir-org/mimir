import { Dispatch } from "redux";
import { CollectionsActions, LibItem } from "../../../../../../../models";
import { addToCollections } from "../../../../../../../redux/store/library/librarySlice";
import { addToCollectionsTypes } from "../../../../../../../redux/store/library/types";

export const OnManageCollection = (
  selectedTypes: LibItem[],
  selectedCollections: string[],
  setCollectionState: (action: CollectionsActions) => void,
  setSelectedTypes: (types: LibItem[]) => void,
  setAddSelectedToCollection: (open: boolean) => void,
  dispatch: Dispatch
) => {
  const collections: addToCollectionsTypes = {
    types: selectedTypes,
    collectionIds: selectedCollections,
  };
  dispatch(addToCollections(collections));
  setAddSelectedToCollection(false);
  setCollectionState(CollectionsActions.ReadOnly);
  setSelectedTypes([]);
};
