import { CollectionsWrapper } from "./styled";
import { CollectionsList } from ".";
import { CollectionsActions, LibraryTab, ObjectType } from "../../../../models";
interface Props {
  activeTab: LibraryTab;
  collectionState: CollectionsActions;
  setCollectionState: (action: CollectionsActions) => void;
  searchString: string;
  selectedElement: string;
  setSelectedElement: React.Dispatch<React.SetStateAction<string>>;
  setSelectedElementType: React.Dispatch<React.SetStateAction<ObjectType>>;
  functionSort: boolean;
  productSort: boolean;
  locationSort: boolean;
}

const CollectionsComponent = ({
  collectionState,
  searchString,
  selectedElement,
  setSelectedElement,
  setSelectedElementType,
  functionSort,
  productSort,
  locationSort,
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
          functionSort={functionSort}
          productSort={productSort}
          locationSort={locationSort}
        />
      )}
    </CollectionsWrapper>
  );
};

export default CollectionsComponent;
