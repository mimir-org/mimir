import * as selectors from "./helpers/selectors";
import { Dispatch } from "redux";
import { useEffect, useRef } from "react";
import { StartPage } from "../start/StartPage";
import { InspectorModule } from "../../modules/inspector/InspectorModule";
import { LibraryModule } from "../../modules/library/LibraryModule";
import { ProjectSubMenus } from "../menus/projectMenu/ProjectSubMenus";
import { search } from "../../redux/store/project/actions";
import { FlowModule } from "../flow/FlowModule";
import { ErrorModule } from "../../modules/error";
import { ValidationModule } from "../../modules/validation";
import { fetchLibrary, fetchLibraryInterfaceTypes, fetchLibraryTransportTypes } from "../../redux/store/library/librarySlice";
import { HeaderComponent } from "../header/HeaderComponent";
import { ExplorerTreeModule, ExplorerBlockModule } from "../../modules/explorer/";
import { fetchUser } from "../../redux/store/user/userSlice";
import { changeActiveMenu } from "../menus/projectMenu/components/subMenus/redux/menuSlice";
import { MENU_TYPE, VIEW_TYPE } from "../../models/project";
import { ToggleColorProfile } from "../../helpers/ToggleColorProfile";
import { isActiveViewSelector, useAppSelector, useParametricAppSelector } from "../../redux/store";
import { VisualFilterComponent } from "../menus/filterMenu/VisualFilterComponent";
import { ToolbarComponent } from "../toolbar/ToolbarComponent";
import { fetchCompanies, fetchCompany, fetchCombinedAttributeFilters, fetchParsers } from "../../redux/store/common/commonSlice";

interface Props {
  dispatch: Dispatch;
}

/**
 * The main component for Mimir.
 * @param interface
 * @returns all the modules and components in the Mimir application.
 */
export const Home = ({ dispatch }: Props) => {
  const projectState = useAppSelector(selectors.projectStateSelector);
  const flowView = useAppSelector(selectors.flowViewSelector);
  const isDarkMode = useAppSelector(selectors.darkModeSelector);
  const isFilterOpen = useAppSelector(selectors.filterSelector);
  const isStartPage = useParametricAppSelector(isActiveViewSelector, VIEW_TYPE.STARTPAGE);
  const activeMenu = useAppSelector(selectors.activeMenuSelector);
  const isProjectMenuOpen = activeMenu != null;
  const isTreeView = flowView === VIEW_TYPE.TREEVIEW;
  const inspectorRef = useRef(null);

  useEffect(() => {
    dispatch(fetchCompany());
    dispatch(fetchLibraryInterfaceTypes());
    dispatch(fetchLibraryTransportTypes());
    dispatch(search(""));
    dispatch(fetchLibrary());
    dispatch(fetchCompanies());
    dispatch(fetchParsers());
    dispatch(fetchCombinedAttributeFilters());
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(changeActiveMenu(null));
    if (isStartPage && !projectState.fetching) {
      dispatch(changeActiveMenu(MENU_TYPE.OPEN_PROJECT_MENU));
    }
  }, [dispatch, isStartPage, projectState.fetching]);

  useEffect(() => {
    ToggleColorProfile(isDarkMode);
  }, [isDarkMode, isTreeView]);

  return (
    <>
      <HeaderComponent />
      {isStartPage ? (
        <StartPage />
      ) : (
        <>
          <ToolbarComponent isTreeView={isTreeView} dispatch={dispatch} />
          {isTreeView && <ExplorerTreeModule dispatch={dispatch} />}
          {!isTreeView && <ExplorerBlockModule dispatch={dispatch} />}
          <FlowModule inspectorRef={inspectorRef} flowView={flowView} dispatch={dispatch} />
          <InspectorModule inspectorRef={inspectorRef} dispatch={dispatch} />
          <LibraryModule dispatch={dispatch} />
          {isFilterOpen && <VisualFilterComponent dispatch={dispatch} />}
          <ValidationModule />
        </>
      )}
      {isProjectMenuOpen && <ProjectSubMenus activeMenu={activeMenu} />}
      <ErrorModule />
    </>
  );
};
