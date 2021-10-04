import * as Handlers from "./handlers";
import * as Icons from "../../assets/icons/common/header";
import { RootState } from "../../redux/store";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { VIEW_TYPE } from "../../models/project";
import { MenuMainHeader } from "../../compLibrary/box/menus";
import { ProjectState } from "../../redux/store/project/types";
import { IsExplorer, IsLibrary } from "../flow/helpers";
import {
  HeaderBox,
  OptionsBox,
  LogoBox,
  OptionsElement,
  MenuBar,
} from "../../compLibrary/box/header/";

const Header = () => {
  const dispatch = useDispatch();
  const { push } = useHistory();
  const projectState = useSelector<RootState>((state) => state.projectState) as ProjectState;
  const isDarkMode = useSelector<RootState>((state) => state.darkMode.active) as boolean;
  const isFilterMenuOpen = useSelector<RootState>((state) => state.menu.list[4].visible) as boolean;

  const isAccountMenuOpen = useSelector<RootState>(
    (state) => state.menu.list[1].visible
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
          <img
            src={Icons.User}
            alt="icon"
            className="icon"
            onClick={() => Handlers.OnAccountClick(dispatch, isAccountMenuOpen)}
          />
          <div
            className="projectName"
            onClick={() => Handlers.OnAccountClick(dispatch, isAccountMenuOpen)}
          >
            {projectState.project && projectState.project.name}
          </div>
        </MenuMainHeader>
        <LogoBox>
          <img
            src={Icons.Mimir}
            alt="mimir-icon"
            onClick={() => Handlers.OnDarkModeClick(dispatch, isDarkMode)}
          />
        </LogoBox>
      </HeaderBox>
      <MenuBar id="MenuBar" isLibraryOpen={isLibraryOpen} isExplorerOpen={isExplorerOpen}>
        <OptionsBox>
          <OptionsElement>
            <img
              src={Icons.Filter}
              alt="VisualFilter"
              onClick={() => Handlers.OnFilterClick(dispatch, isFilterMenuOpen)}
            />
          </OptionsElement>
          <OptionsElement>
            <img src={Icons.Landscape} alt="Landscape" onClick={() => null} />
          </OptionsElement>
          <OptionsElement>
            <img
              src={Icons.BlockView}
              alt={VIEW_TYPE.BLOCKVIEW}
              onClick={(e) => Handlers.OnViewClick(e, dispatch, push)}
            />
          </OptionsElement>
          <OptionsElement>
            <img
              src={Icons.TreeView}
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
