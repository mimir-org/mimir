import { RootState } from "../../redux/store";
import { useHistory } from "react-router-dom";
import { TextResources } from "../../assets/textResources";
import { useDispatch, useSelector } from "react-redux";
import { MENU_TYPE, PROJECT_MENU_TYPE, VIEW_TYPE } from "../../models/project";
import { changeFlowView } from "../../redux/store/flow/actions";
import { setDarkMode } from "../../redux/store/darkMode/actions";
import { FindSelectedNode, SetDarkModeColor } from "../flow/helpers/common";
import { IsBlockView } from "../flow/helpers/block";
import { MenuMainHeader } from "../../compLibrary/box/menus";
import { GetMenuIcon } from "../../assets/helpers";
import { changeProjectMenu } from "../../redux/store/projectMenu/actions";
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
    (state) => state.projectMenu.menu[1].visible
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
    dispatch(
      changeProjectMenu(PROJECT_MENU_TYPE.ACCOUNT_MENU, !accountMenuOpen)
    );
  };

  const onUndo = () => {
    return null;
  };

  return (
    <HeaderBox>
      <MenuMainHeader isOpen={accountMenuOpen}>
        <div className="text" onClick={onAccountClick}>
          {projectState.project && projectState.project.name}
        </div>
        <img
          src={GetMenuIcon(accountMenuOpen, MENU_TYPE.ACCOUNT)}
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
          <img src={UndoIcon} alt="undo" onClick={onUndo} />
        </OptionsElement>
        <OptionsElement>
          <img
            src={IsBlockView() ? TreeViewOffIcon : TreeViewOnIcon}
            alt={IsBlockView() ? VIEW_TYPE.TREEVIEW : VIEW_TYPE.BLOCKVIEW}
            onClick={onViewClick}
          />
        </OptionsElement>
      </OptionsBox>
    </HeaderBox>
  );
};

export default Header;
