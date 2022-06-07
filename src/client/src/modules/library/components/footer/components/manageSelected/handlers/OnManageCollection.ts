import { NodeLibCm } from "@mimirorg/typelibrary-types";
import { Dispatch } from "redux";
import { CollectionsActions } from "../../../../../../../models";
import { addToCollections } from "../../../../../../../redux/store/library/librarySlice";
import { AddToCollectionsTypes } from "../../../../../../../redux/store/library/types";

const OnManageCollection = (
  selectedTypes: NodeLibCm[],
  selectedCollections: string[],
  setCollectionState: (action: CollectionsActions) => void,
  setSelectedTypes: (types: NodeLibCm[]) => void,
  setAddSelectedToCollection: (open: boolean) => void,
  dispatch: Dispatch
) => {
  const collections: AddToCollectionsTypes = {
    libNodes: selectedTypes,
    collectionIds: selectedCollections,
  };
  dispatch(addToCollections(collections));
  setAddSelectedToCollection(false);
  setCollectionState(CollectionsActions.ReadOnly);
  setSelectedTypes([]);
};

export default OnManageCollection;
