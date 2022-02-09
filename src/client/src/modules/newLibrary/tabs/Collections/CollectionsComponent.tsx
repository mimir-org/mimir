import { CollectionsWrapper } from "./styled";
import { CollectionsList } from ".";
import { Aspect, CollectionsActions, LibraryTab, ObjectType } from "../../../../models";

interface Props {
  activeTab: LibraryTab;
  collectionState: CollectionsActions;
  setCollectionState: (action: CollectionsActions) => void;
  searchString: string;
  selectedElement: string;
  setSelectedElement: React.Dispatch<React.SetStateAction<string>>;
  setSelectedElementType: React.Dispatch<React.SetStateAction<ObjectType>>;
  aspectFilters: Aspect[];
}

const CollectionsComponent = ({
  collectionState,
  searchString,
  selectedElement,
  setSelectedElement,
  setSelectedElementType,
  aspectFilters,
}: Props) => {
  const managingCollections = collectionState === CollectionsActions.Manage;

  return (
    <CollectionsWrapper manageCollections={managingCollections}>
      {collectionState === CollectionsActions.ReadOnly && (
        <CollectionsList
          searchString={searchString}
          selectedElement={selectedElement}
          setSelectedElement={setSelectedElement}
          setSelectedElementType={setSelectedElementType}
          aspectFilters={aspectFilters}
        />
      )}
    </CollectionsWrapper>
  );
};

export default CollectionsComponent;
