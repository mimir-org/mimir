import { Aspect, CollectionsActions, LibItem, LibraryTab, ObjectType } from "../../../../models";
import { ModuleContent } from "./ModuleBody.styled";
import { CollectionsComponent } from "./components/collections/CollectionsComponent";
import { SubProjectsComponent } from "./components/subProjects/SubProjectsComponent";
import { TemplatesComponent } from "./components/templates/TemplatesComponent";

interface Props {
  libOpen: boolean;
  activeTab: LibraryTab;
  selectedTypes: LibItem[];
  setSelectedTypes: (array: LibItem[]) => void;
  collectionState: CollectionsActions;
  setCollectionState: (action: CollectionsActions) => void;
  searchString: string;
  selectedElement: string;
  setSelectedElement: (value: string) => void;
  setSelectedElementType: (value: ObjectType) => void;
  aspectFilters: Aspect[];
}

/**
 * Component for showing content in Library Module based on active tab
 * @param interface
 * @returns a component based on active tab
 */
export const ModuleBody = ({
  libOpen,
  activeTab,
  selectedTypes,
  setSelectedTypes,
  collectionState,
  setCollectionState,
  searchString,
  selectedElement,
  setSelectedElement,
  setSelectedElementType,
  aspectFilters,
}: Props) => {
  const showCollections = activeTab === LibraryTab.Library;
  const showSubProjects = activeTab === LibraryTab.SubProjects;
  const showTemplates = activeTab === LibraryTab.Templates;

  return (
    <ModuleContent libOpen={libOpen}>
      {showCollections && (
        <CollectionsComponent
          activeTab={activeTab}
          selectedTypes={selectedTypes}
          setSelectedTypes={setSelectedTypes}
          collectionState={collectionState}
          setCollectionState={setCollectionState}
          searchString={searchString}
          selectedElement={selectedElement}
          setSelectedElement={setSelectedElement}
          setSelectedElementType={setSelectedElementType}
          aspectFilters={aspectFilters}
        />
      )}
      {showSubProjects && <SubProjectsComponent />}
      {showTemplates && <TemplatesComponent />}
    </ModuleContent>
  );
};
