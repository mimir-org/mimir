import { RootState } from "../../redux/store";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MENU_TYPE, VIEW_TYPE } from "../../models/project";
import { changeFlowView } from "../../redux/store/flow/actions";
import { setDarkMode } from "../../redux/store/darkMode/actions";
import { MenuMainHeader } from "../../compLibrary/box/menus";
import { changeMenu } from "../../redux/store/projectMenu/actions";
import { ProjectState } from "../../redux/store/project/types";
import {
  FindSelectedNode,
  IsExplorer,
  IsLibrary,
  SetDarkModeColor,
} from "../flow/helpers/common";
import {
  HeaderBox,
  OptionsBox,
  LogoBox,
  OptionsElement,
  MenuBar,
} from "../../compLibrary/box/header/";
import {
  MimirIcon,
  TreeViewIcon,
  BlockViewIcon,
  FilterIcon,
  UserClosedIcon,
} from "../../assets/icons/common";

const Header = () => {
  const dispatch = useDispatch();
  const { push } = useHistory();
  const selectedNode = FindSelectedNode();

  const projectState = useSelector<RootState>(
    (state) => state.projectState
  ) as ProjectState;

  const darkMode = useSelector<RootState>(
    (state) => state.darkMode.active
  ) as boolean;

  const accountMenuOpen = useSelector<RootState>(
    (state) => state.menu.list[1].visible
  ) as boolean;

  const filterMenuOpen = useSelector<RootState>(
    (state) => state.menu.list[4].visible
  ) as boolean;

  const onViewClick = (e) => {
    if (e.target.alt === VIEW_TYPE.BLOCKVIEW && !selectedNode) return;
    const view = e.target.alt;
    dispatch(changeFlowView(view));
    push(`/home/${view}`);
  };

  const onDarkMode = () => {
    dispatch(setDarkMode(!darkMode));
    SetDarkModeColor(!darkMode);
  };

  const onAccountClick = () => {
    dispatch(changeMenu(MENU_TYPE.ACCOUNT_MENU, !accountMenuOpen));
    dispatch(changeMenu(MENU_TYPE.CREATE_PROJECT_MENU, false));
    dispatch(changeMenu(MENU_TYPE.OPEN_PROJECT_MENU, false));
  };

  const onFilterClick = () => {
    dispatch(changeMenu(MENU_TYPE.VISUAL_FILTER_MENU, !filterMenuOpen));
  };

  const isLibraryOpen = useSelector<RootState>(
    (state) => state.modules.types.find((x) => IsLibrary(x.type)).visible
  ) as boolean;

  const isExplorerOpen = useSelector<RootState>(
    (state) => state.modules.types.find((x) => IsExplorer(x.type)).visible
  ) as boolean;

  return (
    <>
      <HeaderBox>
        <MenuMainHeader isOpen={accountMenuOpen}>
          <div className="projectName" onClick={onAccountClick}>
            {projectState.project && projectState.project.name}
          </div>
          <img
            src={UserClosedIcon}
            alt="icon"
            className="icon"
            onClick={onAccountClick}
          />
        </MenuMainHeader>
        <LogoBox>
          <img src={MimirIcon} alt="dark-mode" onClick={onDarkMode} />
        </LogoBox>
      </HeaderBox>
      <MenuBar
        id="MenuBar"
        isLibraryOpen={isLibraryOpen}
        isExplorerOpen={isExplorerOpen}
      >
        <OptionsBox>
          <OptionsElement>
            <img src={FilterIcon} alt="VisualFilter" onClick={onFilterClick} />
          </OptionsElement>
          <OptionsElement>
            <img
              src={BlockViewIcon}
              alt={VIEW_TYPE.BLOCKVIEW}
              onClick={onViewClick}
            />
          </OptionsElement>
          <OptionsElement>
            <img
              src={TreeViewIcon}
              alt={VIEW_TYPE.TREEVIEW}
              onClick={onViewClick}
            />
          </OptionsElement>
        </OptionsBox>
      </MenuBar>
    </>
  );
};

export default Header;
