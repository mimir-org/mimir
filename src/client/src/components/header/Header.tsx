import styled from "styled-components";
import { RootState } from "../../redux/store";
import { useHistory } from "react-router-dom";
import { TextResources } from "../../assets/text";
import { useDispatch, useSelector } from "react-redux";
import { MENU_TYPE, VIEW_TYPE } from "../../models/project";
import { changeFlowView } from "../../redux/store/flow/actions";
import { setDarkMode } from "../../redux/store/darkMode/actions";
import {
  FindSelectedNode,
  IsExplorer,
  IsLibrary,
  SetDarkModeColor,
} from "../flow/helpers/common";
import { IsBlockView } from "../flow/helpers/block";
import { MenuMainHeader } from "../../compLibrary/box/menus";
import { GetMenuIcon } from "../../assets/helpers";
import { changeMenu } from "../../redux/store/projectMenu/actions";
import { ProjectState } from "../../redux/store/project/types";
import {
  HeaderBox,
  OptionsBox,
  LogoBox,
  OptionsElement,
} from "../../compLibrary/box/header/";
import {
  DarkModeOffIcon,
  DarkModeOnIcon,
  MimirIcon,
  TreeViewOffIcon,
  TreeViewIcon,
  BlockViewIcon,
  FilterIcon,
  UndoIcon,
} from "../../assets/icons/common";
import { Color } from "../../compLibrary";

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

  const SubMenu = styled.div`
    background-color: ${Color.White};
    color: #000;
    height: 40px;
    width: auto;
    border-bottom: 1px solid #d9d9d9;
    position: absolute;
    top: 56px;
    display: inline;
    right: ${(props) => (props.isLibraryOpen ? "333px" : "37px")};
    left: ${(props) => (props.isExplorerOpen ? "333px" : "37px")};
    transition: left 0.3s ease-in-out, right 0.3s ease-in-out;
    z-index: 5;
  `;

  return (
    <>
      <HeaderBox>
        {/* <MenuMainHeader isOpen={accountMenuOpen}>
        <div className="text" onClick={onAccountClick}>
          {projectState.project && projectState.project.name}
        </div>
        <img
          src={GetMenuIcon(accountMenuOpen, MENU_TYPE.ACCOUNT_MENU)}
          alt="icon"
          className="icon"
          onClick={onAccountClick}
        />
      </MenuMainHeader> */}
        <LogoBox>
          <img src={MimirIcon} alt="MimirIcon" />
        </LogoBox>

        {/* <MenuMainHeader
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
      </MenuMainHeader> */}
      </HeaderBox>
      <SubMenu isLibraryOpen={isLibraryOpen} isExplorerOpen={isExplorerOpen}>
        <OptionsBox>
          {/* <OptionsElement>
            <img
              src={darkMode ? DarkModeOnIcon : DarkModeOffIcon}
              alt="dark-mode"
              onClick={onDarkMode}
            />
          </OptionsElement> */}
          {/* <OptionsElement>
            <img src={UndoIcon} alt="undo" onClick={null} />
          </OptionsElement> */}
          <OptionsElement>
            <img src={FilterIcon} alt="Visual Filter" onClick={onFilterClick} />
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
      </SubMenu>
    </>
  );
};

export default Header;
