import { LibraryTab } from "models";
import { TextResources } from "assets/text/TextResources";
import { LibHeader } from "./ModuleHeader.styled";
import { ModuleTabs } from "components/menus/tabMenu/ModuleTabs";
import { SearchArea } from "./components/SearchArea";
import { FilterBoxes } from "./components/FilterBoxes";
import { ExpandButton } from "components/Buttons/ExpandButton";
import { Aspect } from "lib";
import { LibraryIcon } from "assets/icons/modules";

interface Props {
  id: string;
  libOpen: boolean;
  activeTab: LibraryTab;
  setActiveTab: (tab: LibraryTab) => void;
  search: (text: string) => void;
  aspectFilters: Aspect[];
  setAspectFilters: (value: Aspect[]) => void;
  onOpen: () => void;
}

/**
 * Header component for the Library Module.
 * @param interface
 * @returns Library Module tabs, search input and filters.
 */
export const ModuleHeader = ({
  id,
  libOpen,
  activeTab,
  setActiveTab,
  search,
  aspectFilters,
  setAspectFilters,
  onOpen,
}: Props) => (
  <LibHeader>
    {!libOpen ? (
      <ExpandButton text={TextResources.EXPAND_LIB_PANEL} icon={LibraryIcon} offset={[0, 5]} onOpen={onOpen} />
    ) : (
      <>
        <ModuleTabs
          id={id}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpen={onOpen}
          expandButtonText={TextResources.CLOSE_LIB_PANEL}
          expandButtonIcon={LibraryIcon}
        />
        <SearchArea activeTab={activeTab} search={search} />
        <FilterBoxes aspectFilters={aspectFilters} setAspectFilters={setAspectFilters} />
      </>
    )}
  </LibHeader>
);
