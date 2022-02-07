import { CollectionsActions, LibraryTab, ObjectType } from "../../models";
import { ModuleContent } from "./styled";
import { CollectionsComponent } from "./tabs/Collections";
import { SubProjectsComponent } from "./tabs/SubProjects";
import { TemplatesComponent } from "./tabs/Templates";

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

/**
 * Component for showing content in Library Module based on active tab
 * @param interface
 * @returns a component based on active tab
 */

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
  const showCollections = activeTab === LibraryTab.Library;
  const showSubProjects = activeTab === LibraryTab.SubProjects;
  const showTemplates = activeTab === LibraryTab.Templates;
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
      ) : showSubProjects ? (
        <SubProjectsComponent />
      ) : (
        showTemplates && <TemplatesComponent />
      )}
    </ModuleContent>
  );
};

export default ModuleBody;
