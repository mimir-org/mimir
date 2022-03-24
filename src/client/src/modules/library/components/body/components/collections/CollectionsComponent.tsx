import { CollectionsWrapper } from "./CollectionsComponent.styled";
import { Aspect, CollectionsActions, LibItem, LibraryTab } from "../../../../../../models";
import { NodeCollectionList } from "./components/nodeCollection/NodeCollectionList";
import { CollectionsList } from "./components/generalCollection/CollectionsList";

interface Props {
  activeTab: LibraryTab;
  collectionState: CollectionsActions;
  selectedTypes: LibItem[];
  setSelectedTypes: (array: LibItem[]) => void;
  setCollectionState: (action: CollectionsActions) => void;
  searchString: string;
  selectedElement: LibItem | null;
  setSelectedElement: (value: LibItem) => void;
  aspectFilters: Aspect[];
}

export const CollectionsComponent = ({
  collectionState,
  selectedTypes,
  setSelectedTypes,
  searchString,
  selectedElement,
  setSelectedElement,
  aspectFilters,
}: Props) => {
  const managingCollections = collectionState === CollectionsActions.ManageCollection;

  return (
    <CollectionsWrapper manageCollections={managingCollections}>
      {managingCollections ? (
        <CollectionsList />
      ) : (
        <NodeCollectionList
          searchString={searchString}
          selectedElement={selectedElement}
          setSelectedElement={setSelectedElement}
          selectedTypes={selectedTypes}
          setSelectedTypes={setSelectedTypes}
          collectionState={collectionState}
          aspectFilters={aspectFilters}
        />
      )}
    </CollectionsWrapper>
  );
};
