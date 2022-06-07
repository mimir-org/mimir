import { Aspect, CollectionsActions, LibraryTab, Node } from "../../../../models";
import { ModuleContent } from "./ModuleBody.styled";
import { CollectionsComponent } from "./components/collections/CollectionsComponent";
import { SubProjectsComponent } from "./components/subProjects/SubProjectsComponent";
import { TemplatesComponent } from "./components/templates/TemplatesComponent";
import { NodeLibCm } from "@mimirorg/typelibrary-types";

interface Props {
  libOpen: boolean;
  activeTab: LibraryTab;
  selectedLibNodes: NodeLibCm[];
  setSelectedLibNodes: (array: NodeLibCm[]) => void;
  collectionState: CollectionsActions;
  setCollectionState: (action: CollectionsActions) => void;
  searchString: string;
  selectedLibNode: NodeLibCm | null;
  setSelectedLibNode: (value: NodeLibCm) => void;
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
  selectedLibNodes,
  setSelectedLibNodes,
  collectionState,
  setCollectionState,
  searchString,
  selectedLibNode,
  setSelectedLibNode,
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
          selectedLibNodes={selectedLibNodes}
          setSelectedLibNodes={setSelectedLibNodes}
          collectionState={collectionState}
          setCollectionState={setCollectionState}
          searchString={searchString}
          selectedLibNode={selectedLibNode}
          setSelectedLibNode={setSelectedLibNode}
          aspectFilters={aspectFilters}
          selectedNode={selectedNode}
        />
      )}
      {showSubProjects && <SubProjectsComponent />}
      {showTemplates && <TemplatesComponent />}
    </ModuleContent>
  );
};
