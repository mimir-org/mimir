import { CollectionsActions, LibraryTab } from "../../../../models";
import { ModuleContent } from "./ModuleBody.styled";
import { LibNodeElement } from "./components/collections/components/nodeCollection/libNode/LibNodeElement";
import { SubProjectsComponent } from "./components/subProjects/SubProjectsComponent";
import { TemplatesComponent } from "./components/templates/TemplatesComponent";
import { AspectObjectLibCm } from "@mimirorg/typelibrary-types";
import { Aspect, AspectObject, LibrarySubProject } from "lib";

interface Props {
  aspectObjects: AspectObjectLibCm[];
  libOpen: boolean;
  activeTab: LibraryTab;
  selectedLibNodes: AspectObjectLibCm[];
  setSelectedLibNodes: (array: AspectObjectLibCm[]) => void;
  collectionState: CollectionsActions;
  setCollectionState: (action: CollectionsActions) => void;
  searchString: string;
  selectedLibNode: AspectObjectLibCm | null;
  setSelectedLibNode: (value: AspectObjectLibCm) => void;
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
  aspectObjects,
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
      {showCollections &&
        aspectObjects?.map((node) => {
          return (
            <LibNodeElement
              key={node.id}
              libNode={node}
              selectedLibNode={selectedLibNode}
              setSelectedLibNode={setSelectedLibNode}
              selectedLibNodes={selectedLibNodes}
              setSelectedLibNodes={setSelectedLibNodes}
              collectionState={collectionState}
            />
          );
        })}

      {showSubProjects && <SubProjectsComponent items={subProjects} />}
      {showTemplates && <TemplatesComponent />}
    </ModuleContent>
  );
};
