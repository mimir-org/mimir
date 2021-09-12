import * as Handlers from "./handlers";
import { RootState } from "../../redux/store";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { VIEW_TYPE } from "../../models/project";
import { MenuMainHeader } from "../../compLibrary/box/menus";
import { ProjectState } from "../../redux/store/project/types";
import { IsExplorer, IsLibrary } from "../flow/helpers/common";
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

  const projectState = useSelector<RootState>(
    (state) => state.projectState
  ) as ProjectState;

  const isDarkMode = useSelector<RootState>(
    (state) => state.darkMode.active
  ) as boolean;

  const isAccountMenuOpen = useSelector<RootState>(
    (state) => state.menu.list[1].visible
  ) as boolean;

  const isFilterMenuOpen = useSelector<RootState>(
    (state) => state.menu.list[4].visible
  ) as boolean;

  const isLibraryOpen = useSelector<RootState>(
    (state) => state.modules.types.find((x) => IsLibrary(x.type)).visible
  ) as boolean;

  const isExplorerOpen = useSelector<RootState>(
    (state) => state.modules.types.find((x) => IsExplorer(x.type)).visible
  ) as boolean;

  return (
    <>
      <HeaderBox>
        <MenuMainHeader isOpen={isAccountMenuOpen}>
          <div
            className="projectName"
            onClick={() => Handlers.OnAccountClick(dispatch, isAccountMenuOpen)}
          >
            {projectState.project && projectState.project.name}
          </div>
          <img
            src={UserClosedIcon}
            alt="icon"
            className="icon"
            onClick={() => Handlers.OnAccountClick(dispatch, isAccountMenuOpen)}
          />
        </MenuMainHeader>
        <LogoBox>
          <img
            src={MimirIcon}
            alt="mimir-icon"
            onClick={() => Handlers.OnDarkModeClick(dispatch, isDarkMode)}
          />
        </LogoBox>
      </HeaderBox>
      <MenuBar
        id="MenuBar"
        isLibraryOpen={isLibraryOpen}
        isExplorerOpen={isExplorerOpen}
      >
        <OptionsBox>
          <OptionsElement>
            <img
              src={FilterIcon}
              alt="VisualFilter"
              onClick={() => Handlers.OnFilterClick(dispatch, isFilterMenuOpen)}
            />
          </OptionsElement>
          <OptionsElement>
            <img
              src={BlockViewIcon}
              alt={VIEW_TYPE.BLOCKVIEW}
              onClick={(e) => Handlers.OnViewClick(e, dispatch, push)}
            />
          </OptionsElement>
          <OptionsElement>
            <img
              src={TreeViewIcon}
              alt={VIEW_TYPE.TREEVIEW}
              onClick={(e) => Handlers.OnViewClick(e, dispatch, push)}
            />
          </OptionsElement>
        </OptionsBox>
      </MenuBar>
    </>
  );
};

export default Header;
