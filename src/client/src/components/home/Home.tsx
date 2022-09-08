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
import { ExplorerTreeModule, ExplorerBlockModule } from "../../modules/explorer/";
import { fetchUser } from "../../redux/store/user/userSlice";
import { VIEW_TYPE } from "../../models/project";
import { ToggleColorProfile } from "../../helpers/ToggleColorProfile";
import { isActiveViewSelector, useAppSelector, useParametricAppSelector } from "../../redux/store";
import { VisualFilterComponent } from "../menus/filterMenu/VisualFilterComponent";
import { ToolbarComponent } from "../toolbar/ToolbarComponent";
import { fetchCompanies, fetchCompany, fetchParsers } from "../../redux/store/common/commonSlice";
import { HeaderComponent } from "../header/HeaderComponent";
import {
  fetchLibrary,
  fetchLibraryInterfaceTypes,
  fetchLibraryTerminals,
  fetchLibraryTransportTypes,
} from "../../redux/store/library/librarySlice";

interface Props {
  dispatch: Dispatch;
}

/**
 * The main component for Mimir.
 * @param interface
 * @returns all the modules and components in the Mimir application.
 */
export const Home = ({ dispatch }: Props) => {
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
    dispatch(fetchLibraryTerminals());
    dispatch(search(""));
    dispatch(fetchLibrary());
    dispatch(fetchCompanies());
    dispatch(fetchParsers());
    dispatch(fetchUser());
  }, [dispatch]);

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
