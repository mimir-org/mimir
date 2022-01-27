import { CollectionsActions, LibraryTab, ObjectType } from "../../../models";
import { CollectionsComponent } from "../tabs/Collections";
import { SubProjectsComponent } from "../tabs/SubProjects";
// import { TemplatesComponent } from "../Templates";

const GetModuleContent = (
  activeTab: LibraryTab,
  collectionState: CollectionsActions,
  setCollectionState: (action: CollectionsActions) => void,
  searchString,
  selectedElement: string,
  setSelectedElement: React.Dispatch<React.SetStateAction<string>>,
  setSelectedElementType: React.Dispatch<React.SetStateAction<ObjectType>>,
  functionSort,
  productSort,
  locationSort: boolean
) => {
  if (activeTab === LibraryTab.Library || activeTab === LibraryTab.Templates)
    return (
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
    );
  if (activeTab === LibraryTab.SubProjects) return <SubProjectsComponent />;
  //   if (index === LibraryTab.Templates) return <TemplatesComponent />;
};

export default GetModuleContent;
