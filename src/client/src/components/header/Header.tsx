import * as Click from "./handlers";
import * as Icons from "../../assets/icons/header";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { VIEW_TYPE } from "../../models/project";
import { ToolBar } from "./";
import { MenuMainHeader } from "../../compLibrary/box/menus";
import { ProjectState } from "../../redux/store/project/types";
import { IsExplorer, IsLibrary } from "../flow/helpers";
import { HeaderBox, LogoBox } from "../../compLibrary/box/header/";

const Header = () => {
  const dispatch = useDispatch();
  const projectState = useSelector<RootState>((state) => state.projectState) as ProjectState;
  const darkMode = useSelector<RootState>((state) => state.darkMode.active) as boolean;
  const filterMenuOpen = useSelector<RootState>((state) => state.menu.filterMenuVisibility) as boolean;
  const accountMenuOpen = useSelector<RootState>((state) => state.menu.accountMenuVisibility) as boolean;
  const libOpen = useSelector<RootState>((s) => s.modules.types.find((x) => IsLibrary(x.type)).visible) as boolean;
  const explorerOpen = useSelector<RootState>((s) => s.modules.types.find((x) => IsExplorer(x.type)).visible) as boolean;
  const treeView = useSelector<RootState>((s) => s.flow.view === VIEW_TYPE.TREEVIEW) as boolean;
  const electro = useSelector<RootState>((s) => s.electro.visible) as boolean;

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
        electro={electro}
      />
    </>
  );
};

export default Header;
