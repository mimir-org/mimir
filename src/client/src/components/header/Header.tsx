import * as Click from "./handlers";
import * as Icons from "../../assets/icons/header";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { VIEW_TYPE } from "../../models/project";
import { ToolBar } from "./";
import { MenuMainHeader } from "../../compLibrary/box/menus";
import { ProjectState } from "../../redux/store/project/types";
import { IsExplorer, IsLibrary } from "../flow/helpers";
import { HeaderBox, LogoBox } from "../../compLibrary/box/header/";

const Header = () => {
  const dispatch = useAppDispatch();
  const projectState = useAppSelector((s) => s.projectState) as ProjectState;
  const darkMode = useAppSelector((s) => s.darkMode.active);
  const filterMenuOpen = useAppSelector((s) => s.menu.treeFilterMenuVisibility);
  const filterMenuBlockOpen = useAppSelector((s) => s.menu.blockFilterMenuVisibility);
  const accountMenuOpen = useAppSelector((s) => s.menu.accountMenuVisibility);
  const libOpen = useAppSelector((s) => s.modules.types.find((x) => IsLibrary(x.type)).visible);
  const explorerOpen = useAppSelector((s) => s.modules.types.find((x) => IsExplorer(x.type)).visible);
  const treeView = useAppSelector((s) => s.flow.view === VIEW_TYPE.TREEVIEW);
  const electro = useAppSelector((s) => s.electro.visible);

  return (
    <>
      <HeaderBox>
        <MenuMainHeader isOpen={accountMenuOpen}>
          <img src={Icons.User} alt="icon" className="icon" onClick={() => Click.OnAccount(dispatch, accountMenuOpen)} />
          <div className="projectName" onClick={() => Click.OnAccount(dispatch, accountMenuOpen)}>
            {projectState.project && projectState.project.name}
          </div>
        </MenuMainHeader>
        <LogoBox>
          <img src={Icons.Mimir} alt="mimir-icon" onClick={() => Click.OnDarkMode(dispatch, darkMode)} />
        </LogoBox>
      </HeaderBox>
      <ToolBar
        libOpen={libOpen}
        explorerOpen={explorerOpen}
        treeView={treeView}
        filterMenuOpen={filterMenuOpen}
        filterMenuBlockOpen={filterMenuBlockOpen}
        electro={electro}
      />
    </>
  );
};

export default Header;
