import { CollectionsWrapper } from "./CollectionsComponent.styled";
import { Aspect, CollectionsActions, LibraryTab, Node } from "../../../../../../models";
import { NodeCollectionList } from "./components/nodeCollection/NodeCollectionList";
import { CollectionsList } from "./components/generalCollection/CollectionsList";
import { NodeLibCm } from "@mimirorg/typelibrary-types";

interface Props {
  activeTab: LibraryTab;
  collectionState: CollectionsActions;
  selectedTypes: NodeLibCm[];
  setSelectedTypes: (array: NodeLibCm[]) => void;
  setCollectionState: (action: CollectionsActions) => void;
  searchString: string;
  selectedElement: NodeLibCm | null;
  setSelectedElement: (value: NodeLibCm) => void;
  aspectFilters: Aspect[];
  selectedNode: Node;
}

export const CollectionsComponent = ({
  collectionState,
  selectedTypes,
  setSelectedTypes,
  searchString,
  selectedElement,
  setSelectedElement,
  aspectFilters,
  selectedNode,
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
          selectedNode={selectedNode}
        />
      )}
    </CollectionsWrapper>
  );
};
