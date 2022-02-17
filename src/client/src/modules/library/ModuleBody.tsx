import { Aspect, CollectionsActions, LibItem, LibraryTab, ObjectType } from "../../models";
import { ModuleContent } from "./styled";
import { CollectionsComponent } from "./tabs/Collections";
import { SubProjectsComponent } from "./tabs/SubProjects";
import { TemplatesComponent } from "./tabs/Templates";
import { Dispatch, SetStateAction } from "react";

interface Props {
  libOpen: boolean;
  activeTab: LibraryTab;
  selectedTypes: LibItem[];
  setSelectedTypes: (array: LibItem[]) => void;
  collectionState: CollectionsActions;
  setCollectionState: (action: CollectionsActions) => void;
  searchString;
  selectedElement: string;
  setSelectedElement: Dispatch<SetStateAction<string>>;
  setSelectedElementType: Dispatch<SetStateAction<ObjectType>>;
  aspectFilters: Aspect[];
}

/**
 * Component for showing content in Library Module based on active tab
 * @param interface
 * @returns a component based on active tab
 */

const ModuleBody = ({
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

export default ModuleBody;
