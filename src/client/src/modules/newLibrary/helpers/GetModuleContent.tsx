import { CollectionsActions, LibraryTab } from "../../../models";
import { CollectionsComponent } from "../tabs/Collections";
import { SubProjectsComponent } from "../tabs/SubProjects";
// import { TemplatesComponent } from "../Templates";

const GetModuleContent = (
  activeTab: LibraryTab,
  collectionState: CollectionsActions,
  setCollectionState: (action: CollectionsActions) => void
) => {
  if (activeTab === LibraryTab.Library || activeTab === LibraryTab.Templates)
    return (
      <CollectionsComponent activeTab={activeTab} collectionState={collectionState} setCollectionState={setCollectionState} />
    );
  if (activeTab === LibraryTab.SubProjects) return <SubProjectsComponent />;
  //   if (index === LibraryTab.Templates) return <TemplatesComponent />;
};

export default GetModuleContent;
