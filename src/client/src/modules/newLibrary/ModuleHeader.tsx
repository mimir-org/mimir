import { Icon } from "../../compLibrary/icon";
import { LibraryIcon } from "../../assets/icons/modules";
import { OnLibraryClick } from "./handlers";
import { Dispatch } from "redux";
import { LibraryTab } from "../../models";
import { MODULE_TYPE } from "../../models/project";
import { AspectBoxes, ModuleTabs, SearchArea } from ".";
import { LibHeader } from "./styled";

interface Props {
  libOpen: boolean;
  dispatch: Dispatch;
  activeTab: LibraryTab;
  setActiveTab: (tab: LibraryTab) => void;
  search: (text: string) => void;
  functionSort: boolean;
  productSort: boolean;
  locationSort: boolean;
  setFunctionSort: (sort: boolean) => void;
  setProductSort: (sort: boolean) => void;
  setLocationSort: (sort: boolean) => void;
}

/**
 * Header component for library module
 * @param interface
 * @returns library module tabs, search input and filters
 */

const ModuleHeader = ({
  libOpen,
  dispatch,
  activeTab,
  setActiveTab,
  search,
  functionSort,
  productSort,
  locationSort,
  setFunctionSort,
  setProductSort,
  setLocationSort,
}: Props) => {
  const lib = MODULE_TYPE.LIBRARY;

  return (
    <LibHeader isOpen={libOpen}>
      {!libOpen && <Icon size={24} src={LibraryIcon} alt="" onClick={() => OnLibraryClick(dispatch, libOpen, lib)} />}
      {libOpen && (
        <>
          <ModuleTabs isOpen={libOpen} activeTab={activeTab} setActiveTab={setActiveTab} dispatch={dispatch} />
          <SearchArea activeTab={activeTab} search={search} />
          <AspectBoxes
            functionSort={functionSort}
            productSort={productSort}
            locationSort={locationSort}
            setFunctionSort={setFunctionSort}
            setProductSort={setProductSort}
            setLocationSort={setLocationSort}
          />
        </>
      )}
    </LibHeader>
  );
};

export default ModuleHeader;
