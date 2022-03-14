import { Dispatch } from "redux";
import { Aspect, CollectionsActions, LibraryTab } from "../../../../models";
import { TextResources } from "../../../../assets/text/TextResources";
import { LibHeader } from "./ModuleHeader.styled";
import { ModuleTabs } from "./components/ModuleTabs";
import { SearchArea } from "./components/SearchArea";
import { FilterBoxes } from "./components/FilterBoxes";
import { ExpandButton } from "./components/ExpandButton";

interface Props {
  libOpen: boolean;
  dispatch: Dispatch;
  activeTab: LibraryTab;
  setActiveTab: (tab: LibraryTab) => void;
  search: (text: string) => void;
  aspectFilters: Aspect[];
  setAspectFilters: (value: Aspect[]) => void;
  collectionState: CollectionsActions;
  setCollectionState: (action: CollectionsActions) => void;
}

/**
 * Header component for library module
 * @param interface
 * @returns library module tabs, search input and filters
 */

export const ModuleHeader = ({
  libOpen,
  dispatch,
  activeTab,
  setActiveTab,
  search,
  aspectFilters,
  setAspectFilters,
  collectionState,
  setCollectionState,
}: Props) => (
  <LibHeader>
    {!libOpen ? (
      <ExpandButton text={TextResources.LIBRARY_EXPAND_PANEL} offset={[0, 5]} dispatch={dispatch} />
    ) : (
      <>
        <ModuleTabs isOpen={libOpen} activeTab={activeTab} setActiveTab={setActiveTab} dispatch={dispatch} />
        <SearchArea activeTab={activeTab} search={search} />
        <FilterBoxes
          collectionState={collectionState}
          aspectFilters={aspectFilters}
          setAspectFilters={setAspectFilters}
          setCollectionState={setCollectionState}
        />
      </>
    )}
  </LibHeader>
);
