import { Dispatch } from "redux";
import { LibraryTab } from "../../../../models";
import { TextResources } from "../../../../assets/text/TextResources";
import { LibHeader } from "./ModuleHeader.styled";
import { ModuleTabs } from "./components/ModuleTabs";
import { SearchArea } from "./components/SearchArea";
import { FilterBoxes } from "./components/FilterBoxes";
import { ExpandButton } from "./components/ExpandButton";
import { Aspect } from "@mimirorg/modelbuilder-types";

interface Props {
  libOpen: boolean;
  dispatch: Dispatch;
  activeTab: LibraryTab;
  setActiveTab: (tab: LibraryTab) => void;
  search: (text: string) => void;
  aspectFilters: Aspect[];
  setAspectFilters: (value: Aspect[]) => void;
}

/**
 * Header component for the Library Module.
 * @param interface
 * @returns Library Module tabs, search input and filters.
 */

export const ModuleHeader = ({ libOpen, dispatch, activeTab, setActiveTab, search, aspectFilters, setAspectFilters }: Props) => (
  <LibHeader>
    {!libOpen ? (
      <ExpandButton text={TextResources.EXPAND_LIB_PANEL} offset={[0, 5]} dispatch={dispatch} />
    ) : (
      <>
        <ModuleTabs isOpen={libOpen} activeTab={activeTab} setActiveTab={setActiveTab} dispatch={dispatch} />
        <SearchArea activeTab={activeTab} search={search} />
        <FilterBoxes aspectFilters={aspectFilters} setAspectFilters={setAspectFilters} />
      </>
    )}
  </LibHeader>
);
