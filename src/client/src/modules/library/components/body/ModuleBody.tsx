import { Aspect, CollectionsActions, LibraryTab, Node } from "../../../../models";
import { ModuleContent } from "./ModuleBody.styled";
import { CollectionsComponent } from "./components/collections/CollectionsComponent";
import { SubProjectsComponent } from "./components/subProjects/SubProjectsComponent";
import { TemplatesComponent } from "./components/templates/TemplatesComponent";
import { NodeLibCm } from "@mimirorg/typelibrary-types";

interface Props {
  libOpen: boolean;
  activeTab: LibraryTab;
  selectedTypes: NodeLibCm[];
  setSelectedTypes: (array: NodeLibCm[]) => void;
  collectionState: CollectionsActions;
  setCollectionState: (action: CollectionsActions) => void;
  searchString: string;
  selectedElement: NodeLibCm | null;
  setSelectedElement: (value: NodeLibCm) => void;
  aspectFilters: Aspect[];
  selectedNode: Node;
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
  aspectFilters,
  selectedNode,
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
          aspectFilters={aspectFilters}
          selectedNode={selectedNode}
        />
      )}
      {showSubProjects && <SubProjectsComponent />}
      {showTemplates && <TemplatesComponent />}
    </ModuleContent>
  );
};
