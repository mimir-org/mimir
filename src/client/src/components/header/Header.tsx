import * as Click from "./handlers";
import * as Icons from "../../assets/icons/header";
import { RootState } from "../../redux/store";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ViewType, VIEW_TYPE } from "../../models/project";
import { MenuMainHeader } from "../../compLibrary/box/menus";
import { ProjectState } from "../../redux/store/project/types";
import { IsExplorer, IsLibrary } from "../flow/helpers";
import { HeaderBox, OptionsBox, LogoBox, OptionsElement, ToolBar } from "../../compLibrary/box/header/";

const Header = () => {
  const dispatch = useDispatch();
  const { push } = useHistory();
  const projectState = useSelector<RootState>((state) => state.projectState) as ProjectState;
  const darkMode = useSelector<RootState>((state) => state.darkMode.active) as boolean;
  const filterMenuOpen = useSelector<RootState>((state) => state.menu.filterMenuVisibility) as boolean;
  const accountMenuOpen = useSelector<RootState>((state) => state.menu.accountMenuVisibility) as boolean;
  const libraryOpen = useSelector<RootState>((s) => s.modules.types.find((x) => IsLibrary(x.type)).visible) as boolean;
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

      <ToolBar id="ToolBar" isLibraryOpen={libraryOpen} isExplorerOpen={explorerOpen}>
        <OptionsBox>
          <OptionsElement onClick={() => Click.OnFilter(dispatch, filterMenuOpen)}>
            <img src={Icons.Filter} alt="VisualFilter" />
          </OptionsElement>
          <OptionsElement onClick={() => Click.OnElectro(dispatch, electro, treeView)}>
            <img src={treeView || !electro ? Icons.Vertical : Icons.Horizontal} alt="Electro" />
          </OptionsElement>
          <OptionsElement
            treeView={treeView}
            onClick={() => Click.OnView(VIEW_TYPE.BLOCKVIEW as ViewType, dispatch, push)}
          >
            <img src={treeView ? Icons.BlockView : Icons.BlockViewActive} alt={VIEW_TYPE.BLOCKVIEW} />
          </OptionsElement>
          <OptionsElement
            treeView={treeView}
            onClick={() => Click.OnView(VIEW_TYPE.TREEVIEW as ViewType, dispatch, push)}
          >
            <img src={treeView ? Icons.TreeViewActive : Icons.TreeView} alt={VIEW_TYPE.TREEVIEW} />
          </OptionsElement>
        </OptionsBox>
      </ToolBar>
    </>
  );
};

export default Header;
