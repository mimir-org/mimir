import * as Click from "./handlers";
import * as Icons from "../../assets/icons/header";
import { ToolBar } from "./";
import { MenuMainHeader } from "../../compLibrary/box/menus";
import { HeaderBox, LogoBox } from "../../compLibrary/box/header/";
import {
  darkModeSelector,
  isAccountMenuOpenSelector,
  isElectroVisibleSelector,
  isExplorerOpenSelector,
  isFilterMenuOpenSelector,
  isLibOpenSelector,
  isTreeViewSelector,
  projectSelector,
  useAppDispatch,
  useAppSelector,
} from "../../redux/store";

const Header = () => {
  const dispatch = useAppDispatch();
  const project = useAppSelector(projectSelector);
  const darkMode = useAppSelector(darkModeSelector);
  const isFilterMenuOpen = useAppSelector(isFilterMenuOpenSelector);
  const isAccountMenuOpen = useAppSelector(isAccountMenuOpenSelector);
  const isLibOpen = useAppSelector(isLibOpenSelector);
  const isExplorerOpen = useAppSelector(isExplorerOpenSelector);
  const isTreeView = useAppSelector(isTreeViewSelector);
  const electro = useAppSelector(isElectroVisibleSelector);

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
        libOpen={isLibOpen}
        explorerOpen={isExplorerOpen}
        treeView={isTreeView}
        filterMenuOpen={isFilterMenuOpen}
        electro={electro}
      />
    </>
  );
};

export default Header;
