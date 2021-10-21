import * as Click from "./handlers";
import * as Icons from "../../assets/icons/header";
import { ToolBar } from "./";
import { MenuMainHeader } from "../../compLibrary/box/menus";
import { HeaderBox, LogoBox } from "../../compLibrary/box/header/";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import {
  darkModeSelector,
  accountMenuOpenSelector,
  isElectroSelector,
  explorerOpenSelector,
  filterMenuOpenSelector,
  libOpenSelector,
  treeViewSelector,
  projectSelector,
} from "../../redux/store";

const Header = () => {
  const dispatch = useAppDispatch();
  const project = useAppSelector(projectSelector);
  const darkMode = useAppSelector(darkModeSelector);
  const filterMenuOpen = useAppSelector(filterMenuOpenSelector);
  const isAccountMenuOpen = useAppSelector(accountMenuOpenSelector);
  const libOpen = useAppSelector(libOpenSelector);
  const explorerOpen = useAppSelector(explorerOpenSelector);
  const treeView = useAppSelector(treeViewSelector);
  const electro = useAppSelector(isElectroSelector);

  return (
    <>
      <HeaderBox>
        <MenuMainHeader isOpen={isAccountMenuOpen}>
          <img
            src={Icons.User}
            alt="icon"
            className="icon"
            onClick={() => Click.OnAccount(dispatch, isAccountMenuOpen)}
          />
          <div className="projectName" onClick={() => Click.OnAccount(dispatch, isAccountMenuOpen)}>
            {project && project.name}
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
        filterMenuBlockOpen={filterMenuOpen}
        electro={electro}
      />
    </>
  );
};

export default Header;
