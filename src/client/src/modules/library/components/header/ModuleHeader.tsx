import { Icon } from "../../../../compLibrary/icon";
import { LibraryIcon } from "../../../../assets/icons/modules";
import { OnLibraryClick } from "../../handlers";
import { Dispatch } from "redux";
import { MODULE_TYPE } from "../../../../models/project";
import { Tooltip } from "../../../../compLibrary/tooltip/Tooltip";
import { TextResources } from "../../../../assets/text";
import { Aspect, LibraryTab } from "../../../../models";
import { LibHeader } from "./ModuleHeader.styled";
import { LibExpandButton } from "./styled/LibExpandButton";
import { ModuleTabs } from "./components/ModuleTabs";
import { SearchArea } from "./components/SearchArea";
import { FilterBoxes } from "./components/FilterBoxes";

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
 * Header component for library module
 * @param interface
 * @returns library module tabs, search input and filters
 */

export const ModuleHeader = ({ libOpen, dispatch, activeTab, setActiveTab, search, aspectFilters, setAspectFilters }: Props) => {
  const lib = MODULE_TYPE.LIBRARY;

  return (
    <LibHeader>
      {!libOpen && (
        <Tooltip content={TextResources.Library_Expand_Panel} placement={"bottom"} offset={[0, 5]}>
          <LibExpandButton isOpen={false} onClick={() => OnLibraryClick(dispatch, libOpen, lib)}>
            <Icon size={24} src={LibraryIcon} alt="" />
          </LibExpandButton>
        </Tooltip>
      )}
      {libOpen && (
        <>
          <ModuleTabs isOpen={libOpen} activeTab={activeTab} setActiveTab={setActiveTab} dispatch={dispatch} />
          <SearchArea activeTab={activeTab} search={search} />
          <FilterBoxes aspectFilters={aspectFilters} setAspectFilters={setAspectFilters} />
        </>
      )}
    </LibHeader>
  );
};
