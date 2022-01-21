import { Dispatch } from "redux";
import { LibraryTab, Project } from "../../models";
import { Icon } from "../../compLibrary/icon";
import { LibraryIcon } from "../../assets/icons/modules";
import { LibraryTabHeader, LibraryTabsWrapper } from "./styled";
import { OnLibraryClick } from "./handlers";
import { MODULE_TYPE } from "../../models/project";

interface Props {
  isOpen: boolean;
  activeTab: LibraryTab;
  setActiveTab: (tab: LibraryTab) => void;
  project: Project;
  dispatch: Dispatch;
  collections?: any[];
  templates?: any[];
  subProjects?: any[];
}

const ModuleTabs = ({ isOpen, activeTab, setActiveTab, project, dispatch, collections, templates, subProjects }: Props) => {
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
                <p>{LibraryTab[key]}</p>
              </LibraryTabHeader>
            </div>
          );
        })}
    </LibraryTabsWrapper>
  );
};

export default ModuleTabs;
