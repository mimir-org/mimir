import * as selectors from "./helpers/selectors";
import { Dispatch } from "redux";
import { useEffect, useRef } from "react";
import { StartPage } from "../start/StartPage";
import { InspectorModule } from "../../modules/inspector/InspectorModule";
import { LibraryModule } from "../../modules/library/LibraryModule";
import { ProjectSubMenus } from "../menus/projectMenu/ProjectSubMenus";
// import { search } from "../../redux/store/project/actions";
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
  fetchLibraryAttributeTypes,
  fetchLibraryInterfaceTypes,
  fetchLibraryTerminals,
  fetchLibraryTransportTypes,
  fetchQuantityDatums,
  fetchSubProjects,
} from "../../redux/store/library/librarySlice";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { defaultFilter, VisualFilterData } from "../../models/application/VisualFilter";

interface Props {
  dispatch: Dispatch;
}

/**
 * The main component for Mimir.
 * @param interface
 * @returns all the modules and components in the Mimir application.
 */
export const Home = ({ dispatch }: Props) => {
  const [filter, setFilter] = useLocalStorage("visual_filter", defaultFilter);
  const flowView = useAppSelector(selectors.flowViewSelector);
  const isDarkMode = useAppSelector(selectors.darkModeSelector);
  const isFilterOpen = useAppSelector(selectors.filterSelector);
  const isStartPage = useParametricAppSelector(isActiveViewSelector, VIEW_TYPE.STARTPAGE);
  const activeMenu = useAppSelector(selectors.activeMenuSelector);
  const isProjectMenuOpen = activeMenu != null;
  const isTreeView = flowView === VIEW_TYPE.TREEVIEW;
  const inspectorRef = useRef(null);

  const onFilterChange = (filter: VisualFilterData) => {
    setFilter(filter);
  };

  useEffect(() => {
    dispatch(fetchCompany());
    dispatch(fetchSubProjects());
    dispatch(fetchLibraryInterfaceTypes());
    dispatch(fetchLibraryTransportTypes());
    dispatch(fetchLibraryTerminals());
    dispatch(fetchLibraryAttributeTypes());
    // dispatch(search(""));
    dispatch(fetchLibrary());
    dispatch(fetchCompanies());
    dispatch(fetchParsers());
    dispatch(fetchUser());
    dispatch(fetchQuantityDatums());
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
          <FlowModule inspectorRef={inspectorRef} flowView={flowView} dispatch={dispatch} filter={filter} />
          <InspectorModule inspectorRef={inspectorRef} dispatch={dispatch} />
          <LibraryModule dispatch={dispatch} />
          {isFilterOpen && <VisualFilterComponent filter={filter} onFilterChange={onFilterChange} />}
          <ValidationModule />
        </>
      )}
      {isProjectMenuOpen && <ProjectSubMenus activeMenu={activeMenu} />}
      <ErrorModule />
    </>
  );
};
