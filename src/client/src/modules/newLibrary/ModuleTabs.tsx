/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch } from "redux";
import { LibraryTab } from "../../models";
import { Icon } from "../../compLibrary/icon";
import { LibraryIcon } from "../../assets/icons/modules";
import { OnLibraryClick } from "./handlers";
import { ConvertToLibTabName } from "./helpers";
import { MODULE_TYPE } from "../../models/project";
import { LibraryTabHeader, LibraryTabsWrapper } from "./styled";

interface Props {
  isOpen: boolean;
  activeTab: LibraryTab;
  setActiveTab: (tab: LibraryTab) => void;
  dispatch: Dispatch;
}

/**
 * Tabs component in library module
 * @param interface
 * @returns every tab in library module
 */

const ModuleTabs = ({ isOpen, activeTab, setActiveTab, dispatch }: Props) => {
  const lib = MODULE_TYPE.LIBRARY;
  const stringIsNumber = (v: any) => isNaN(Number(v)) === false;

  return (
    <LibraryTabsWrapper>
      <Icon size={24} src={LibraryIcon} alt="" onClick={() => OnLibraryClick(dispatch, isOpen, lib)} />

      {Object.keys(LibraryTab)
        .filter(stringIsNumber)
        .map((key) => {
          return (
            <div key={key} onClick={() => setActiveTab(Number(key) as LibraryTab)}>
              <LibraryTabHeader key={key} isActive={activeTab === Number(key)}>
                <p>{ConvertToLibTabName(Number(key) as LibraryTab)}</p>
              </LibraryTabHeader>
            </div>
          );
        })}
    </LibraryTabsWrapper>
  );
};

export default ModuleTabs;
