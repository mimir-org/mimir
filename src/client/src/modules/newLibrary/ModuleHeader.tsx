import { Icon } from "../../compLibrary/icon";
import { LibraryIcon } from "../../assets/icons/modules";
import { OnLibraryClick } from "./handlers";
import { Dispatch } from "redux";
import { LibraryTab, Project } from "../../models";
import { MODULE_TYPE } from "../../models/project";
import { AspectBoxes, ModuleTabs, SearchArea } from ".";
import { LibHeader } from "./styled";

interface Props {
  libOpen: boolean;
  dispatch: Dispatch;
  activeTab: LibraryTab;
  setActiveTab: (tab: LibraryTab) => void;
  project: Project;
  onChange?: () => void;
}

const ModuleHeader = ({ libOpen, dispatch, activeTab, setActiveTab, project, onChange }: Props) => {
  const lib = MODULE_TYPE.LIBRARY;

  return (
    <LibHeader isOpen={libOpen}>
      {!libOpen && <Icon size={24} src={LibraryIcon} alt="" onClick={() => OnLibraryClick(dispatch, libOpen, lib)} />}
      {libOpen && (
        <>
          <ModuleTabs isOpen={libOpen} activeTab={activeTab} setActiveTab={setActiveTab} project={project} dispatch={dispatch} />
          <SearchArea activeTab={activeTab} />
          {/* TO DO: disable cursor and hover if no collections */}
          <AspectBoxes onChange={onChange} />
        </>
      )}
    </LibHeader>
  );
};

export default ModuleHeader;
