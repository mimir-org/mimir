import { RootState } from "../../redux/store";
import { useHistory } from "react-router-dom";
import { TextResources } from "../../assets/text";
import { useDispatch, useSelector } from "react-redux";
import { MENU_TYPE, VIEW_TYPE } from "../../models/project";
import { changeFlowView } from "../../redux/store/flow/actions";
import { setDarkMode } from "../../redux/store/darkMode/actions";
import { FindSelectedNode, SetDarkModeColor } from "../flow/helpers/common";
import { IsBlockView } from "../flow/helpers/block";
import { MenuMainHeader } from "../../compLibrary/box/menus";
import { GetMenuIcon } from "../../assets/helpers";
import { changeMenu } from "../../redux/store/projectMenu/actions";
import { ProjectState } from "../../redux/store/project/types";
import {
  HeaderBox,
  OptionsBox,
  TitleBox,
  OptionsElement,
} from "../../compLibrary/box/header/";
import {
  DarkModeOffIcon,
  DarkModeOnIcon,
  TreeViewOffIcon,
  TreeViewOnIcon,
  UndoIcon,
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

  return (
    <HeaderBox>
      <MenuMainHeader isOpen={accountMenuOpen}>
        <div className="text" onClick={onAccountClick}>
          {projectState.project && projectState.project.name}
        </div>
        <img
          src={GetMenuIcon(accountMenuOpen, MENU_TYPE.ACCOUNT_MENU)}
          alt="icon"
          className="icon"
          onClick={onAccountClick}
        />
      </MenuMainHeader>
      <TitleBox>{TextResources.MainHeader_App_Name} </TitleBox>
      <OptionsBox>
        <OptionsElement>
          <img
            src={darkMode ? DarkModeOnIcon : DarkModeOffIcon}
            alt="dark-mode"
            onClick={onDarkMode}
          />
        </OptionsElement>
        <OptionsElement>
          <img src={UndoIcon} alt="undo" onClick={null} />
        </OptionsElement>
        <OptionsElement>
          <img
            src={IsBlockView() ? TreeViewOffIcon : TreeViewOnIcon}
            alt={IsBlockView() ? VIEW_TYPE.TREEVIEW : VIEW_TYPE.BLOCKVIEW}
            onClick={onViewClick}
          />
        </OptionsElement>
      </OptionsBox>
      <MenuMainHeader
        isOpen={filterMenuOpen}
        right
        type={MENU_TYPE.VISUAL_FILTER_MENU}
        id="FilterHeader"
      >
        <div className="text" onClick={onFilterClick}>
          {TextResources.MainHeader_VisualFilter}
        </div>
        <img
          src={GetMenuIcon(filterMenuOpen, MENU_TYPE.VISUAL_FILTER_MENU)}
          alt="icon"
          className="icon"
          onClick={onFilterClick}
        />
      </MenuMainHeader>
    </HeaderBox>
  );
};

export default Header;
