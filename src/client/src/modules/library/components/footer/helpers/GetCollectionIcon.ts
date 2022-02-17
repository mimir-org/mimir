import { CollectionsActions, LibraryTab } from "../../../../../models";
import { AddToCollections, Collections, Templates } from "../../../../../assets/icons/library";

export const GetCollectionIcon = (collectionState: CollectionsActions, activeTab: LibraryTab) => {
  if (activeTab === LibraryTab.Library) {
    if (collectionState === CollectionsActions.ManageType) return AddToCollections;
    if (collectionState === CollectionsActions.ManageCollection) return Collections;
  }
  if (activeTab === LibraryTab.Templates) return Templates;
};
