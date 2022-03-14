import { CollectionsWrapper, CollectionsUpdateButtonWrapper } from "./CollectionsComponent.styled";
import { Aspect, CollectionsActions, LibItem, LibraryTab, ObjectType } from "../../../../../../models";
import { NodeCollectionList } from "./components/nodeCollection/NodeCollectionList";
import { CollectionsList } from "./components/generalCollection/CollectionsList";
import { Button, ButtonVariant } from "../../../../../../compLibrary/buttons";
import { TextResources } from "../../../../../../assets/text";

interface Props {
  activeTab: LibraryTab;
  collectionState: CollectionsActions;
  selectedTypes: string[];
  setSelectedTypes: (array: string[]) => void;
  setCollectionState: (action: CollectionsActions) => void;
  searchString: string;
  selectedElement: string;
  setSelectedElement: (value: string) => void;
  setSelectedElementType: (value: ObjectType) => void;
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
        <>
          <CollectionsList collectionState={collectionState} />
          <CollectionsUpdateButtonWrapper>
            <Button
              onClick={() => null}
              text={TextResources.Library_Manage_Collections_Update_Library}
              variant={ButtonVariant.WhiteButton}
            />
          </CollectionsUpdateButtonWrapper>
        </>
      ) : (
        <NodeCollectionList
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
