import { CollectionsWrapper } from "./CollectionsComponent.styled";
import { CollectionsActions, LibraryTab } from "../../../../../../models";
import { CollectionsList } from "./components/generalCollection/CollectionsList";
import { NodeLibCm } from "@mimirorg/typelibrary-types";
import { AspectObject, Aspect } from "lib";
import { LibNodeCollectionList } from "./components/nodeCollection/libNode/LibNodeCollectionList";

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
  selectedNode: AspectObject;
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
  const isManagingCollections = collectionState === CollectionsActions.ManageCollection;

  return (
    <CollectionsWrapper manageCollections={isManagingCollections}>
      {isManagingCollections ? (
        <CollectionsList />
      ) : (
        <LibNodeCollectionList
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
