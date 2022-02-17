import { CollectionsWrapper } from "./CollectionsComponent.styled";
import { Aspect, CollectionsActions, LibItem, LibraryTab, ObjectType } from "../../../../../../models";
import { OldLibraryComponent } from "./components/OldLibraryComponent";
import { CollectionsList } from "./components/CollectionsList";

interface Props {
  activeTab: LibraryTab;
  collectionState: CollectionsActions;
  selectedTypes: LibItem[];
  setSelectedTypes: (array: LibItem[]) => void;
  setCollectionState: (action: CollectionsActions) => void;
  searchString: string;
  selectedElement: string;
  setSelectedElement: React.Dispatch<React.SetStateAction<string>>;
  setSelectedElementType: React.Dispatch<React.SetStateAction<ObjectType>>;
  aspectFilters: Aspect[];
}

export const CollectionsComponent = ({
  collectionState,
  selectedTypes,
  setSelectedTypes,
  searchString,
  selectedElement,
  setSelectedElement,
  setSelectedElementType,
  aspectFilters,
}: Props) => {
  const managingCollections = collectionState === CollectionsActions.ManageCollection;

  return (
    <CollectionsWrapper manageCollections={managingCollections}>
      {managingCollections ? (
        <CollectionsList />
      ) : (
        <OldLibraryComponent
          searchString={searchString}
          selectedElement={selectedElement}
          setSelectedElement={setSelectedElement}
          setSelectedElementType={setSelectedElementType}
          selectedTypes={selectedTypes}
          setSelectedTypes={setSelectedTypes}
          collectionState={collectionState}
          aspectFilters={aspectFilters}
        />
      )}
    </CollectionsWrapper>
  );
};
