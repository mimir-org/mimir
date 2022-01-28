import { CollectionsActions, LibraryTab, ObjectType } from "../../models";
import { ModuleContent } from "./styled";
import { CollectionsComponent } from "./tabs/Collections";
import { SubProjectsComponent } from "./tabs/SubProjects";

interface Props {
  libOpen: boolean;
  activeTab: LibraryTab;
  collectionState: CollectionsActions;
  setCollectionState: (action: CollectionsActions) => void;
  searchString;
  selectedElement: string;
  setSelectedElement: React.Dispatch<React.SetStateAction<string>>;
  setSelectedElementType: React.Dispatch<React.SetStateAction<ObjectType>>;
  functionSort;
  productSort;
  locationSort: boolean;
}

const ModuleBody = ({
  libOpen,
  activeTab,
  collectionState,
  setCollectionState,
  searchString,
  selectedElement,
  setSelectedElement,
  setSelectedElementType,
  functionSort,
  productSort,
  locationSort,
}: Props) => {
  const showCollections = activeTab === LibraryTab.Library || activeTab === LibraryTab.Templates;
  // const showSubProjects = activeTab === LibraryTab.SubProjects;
  return (
    <ModuleContent libOpen={libOpen}>
      {showCollections ? (
        <CollectionsComponent
          activeTab={activeTab}
          collectionState={collectionState}
          setCollectionState={setCollectionState}
          searchString={searchString}
          selectedElement={selectedElement}
          setSelectedElement={setSelectedElement}
          setSelectedElementType={setSelectedElementType}
          functionSort={functionSort}
          productSort={productSort}
          locationSort={locationSort}
        />
      ) : (
        <SubProjectsComponent />
      )}
    </ModuleContent>
  );
};

export default ModuleBody;
