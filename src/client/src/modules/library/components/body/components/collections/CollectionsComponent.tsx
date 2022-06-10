import { CollectionsWrapper } from "./CollectionsComponent.styled";
import { CollectionsActions, LibraryTab } from "../../../../../../models";
import { NodeCollectionList } from "./components/nodeCollection/NodeCollectionList";
import { CollectionsList } from "./components/generalCollection/CollectionsList";
import { NodeLibCm } from "@mimirorg/typelibrary-types";
import { Node, Aspect } from "@mimirorg/modelbuilder-types";

interface Props {
  activeTab: LibraryTab;
  collectionState: CollectionsActions;
  selectedLibNodes: NodeLibCm[];
  setSelectedLibNodes: (array: NodeLibCm[]) => void;
  setCollectionState: (action: CollectionsActions) => void;
  searchString: string;
  selectedLibNode: NodeLibCm | null;
  setSelectedLibNode: (value: NodeLibCm) => void;
  aspectFilters: Aspect[];
  selectedNode: Node;
}

export const CollectionsComponent = ({
  collectionState,
  selectedLibNodes,
  setSelectedLibNodes,
  searchString,
  selectedLibNode,
  setSelectedLibNode,
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
          selectedLibNode={selectedLibNode}
          setSelectedLibNode={setSelectedLibNode}
          selectedLibNodes={selectedLibNodes}
          setSelectedLibNodes={setSelectedLibNodes}
          collectionState={collectionState}
          aspectFilters={aspectFilters}
          selectedNode={selectedNode}
        />
      )}
    </CollectionsWrapper>
  );
};
