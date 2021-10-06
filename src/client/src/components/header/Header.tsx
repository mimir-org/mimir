import * as Click from "./handlers";
import * as Icons from "../../assets/icons/common/header";
import { RootState } from "../../redux/store";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { VIEW_TYPE } from "../../models/project";
import { MenuMainHeader } from "../../compLibrary/box/menus";
import { ProjectState } from "../../redux/store/project/types";
import { IsExplorer, IsLibrary } from "../flow/helpers";
import { HeaderBox, OptionsBox, LogoBox, OptionsElement, MenuBar } from "../../compLibrary/box/header/";

const Header = () => {
  const dispatch = useDispatch();
  const { push } = useHistory();
  const projectState = useSelector<RootState>((state) => state.projectState) as ProjectState;
  const darkMode = useSelector<RootState>((state) => state.darkMode.active) as boolean;
  const filterMenuOpen = useSelector<RootState>((state) => state.menu.filterMenuVisibility) as boolean;
  const accountMenuOpen = useSelector<RootState>((state) => state.menu.accountMenuVisibility) as boolean;
  const libraryOpen = useSelector<RootState>((s) => s.modules.types.find((x) => IsLibrary(x.type)).visible) as boolean;
  const explorerOpen = useSelector<RootState>((s) => s.modules.types.find((x) => IsExplorer(x.type)).visible) as boolean;

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
      <MenuBar id="MenuBar" isLibraryOpen={libraryOpen} isExplorerOpen={explorerOpen}>
        <OptionsBox>
          <OptionsElement>
            <img src={Icons.Filter} alt="VisualFilter" onClick={() => Click.OnFilter(dispatch, filterMenuOpen)} />
          </OptionsElement>
          <OptionsElement>
            <img src={Icons.Vertical} alt="Direction" onClick={() => null} />
          </OptionsElement>
          <OptionsElement>
            <img src={Icons.BlockView} alt={VIEW_TYPE.BLOCKVIEW} onClick={(e) => Click.OnView(e, dispatch, push)} />
          </OptionsElement>
          <OptionsElement>
            <img src={Icons.TreeView} alt={VIEW_TYPE.TREEVIEW} onClick={(e) => Click.OnView(e, dispatch, push)} />
          </OptionsElement>
        </OptionsBox>
      </MenuBar>
    </>
  );
};

export default Header;
