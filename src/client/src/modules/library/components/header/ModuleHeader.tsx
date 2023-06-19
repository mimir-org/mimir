import { LibraryTab } from "../../../../models";
import { TextResources } from "../../../../assets/text/TextResources";
import { LibHeader } from "./ModuleHeader.styled";
import { ModuleTabs } from "./components/ModuleTabs";
import { SearchArea } from "./components/SearchArea";
import { FilterBoxes } from "./components/FilterBoxes";
import { ExpandButton } from "./components/ExpandButton";
import { Aspect } from "../../../../lib";

interface Props {
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
export const ModuleHeader = ({ libOpen, activeTab, setActiveTab, search, aspectFilters, setAspectFilters, onOpen }: Props) => (
  <LibHeader>
    {!libOpen ? (
      <ExpandButton text={TextResources.EXPAND_LIB_PANEL} offset={[0, 5]} onOpen={onOpen} />
    ) : (
      <>
        <ModuleTabs activeTab={activeTab} setActiveTab={setActiveTab} onOpen={onOpen} />
        <SearchArea activeTab={activeTab} search={search} />
        <FilterBoxes aspectFilters={aspectFilters} setAspectFilters={setAspectFilters} />
      </>
    )}
  </LibHeader>
);
