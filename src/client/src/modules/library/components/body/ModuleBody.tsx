import { CollectionsActions, LibraryTab } from "../../../../models";
import { ModuleContent } from "./ModuleBody.styled";
import { CollectionsComponent } from "./components/collections/CollectionsComponent";
import { SubProjectsComponent } from "./components/subProjects/SubProjectsComponent";
import { TemplatesComponent } from "./components/templates/TemplatesComponent";
import { NodeLibCm } from "@mimirorg/typelibrary-types";
import { Aspect, AspectObject, LibrarySubProject } from "lib";

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
  selectedNode: AspectObject;
  subProjects: LibrarySubProject[];
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
  subProjects,
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
      {showSubProjects && <SubProjectsComponent items={subProjects} />}
      {showTemplates && <TemplatesComponent />}
    </ModuleContent>
  );
};
