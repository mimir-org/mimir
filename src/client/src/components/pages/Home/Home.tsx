import { activeMenuSelector } from "redux/store";
import { Dispatch } from "redux";
import { useEffect, useRef } from "react";
import { StartPage } from "../Start/StartPage";
import { InspectorModule } from "../../../modules/inspector/InspectorModule";
import { LibraryModule } from "../../../modules/library/LibraryModule";
import { ProjectSubMenus } from "../../menus/projectMenu/ProjectSubMenus";
// import { search } from "../../redux/store/project/actions";
import { FlowModule } from "../../flow/FlowModule";
import { ErrorModule } from "../../../modules/error";
import { ValidationModule } from "../../../modules/validation";
import { ExplorerTreeModule, ExplorerBlockModule } from "../../../modules/explorer";
import { ToggleColorProfile } from "../../../helpers/ToggleColorProfile";
import { useAppSelector } from "store";
import { VisualFilterComponent } from "../../menus/filterMenu/VisualFilterComponent";
import { ToolbarComponent } from "../../toolbar/ToolbarComponent";
// import { fetchCompanies, fetchCompany, fetchParsers } from "../../redux/store/common/commonSlice";
import { HeaderComponent } from "../../header/HeaderComponent";
import {
  fetchLibrary,
  fetchLibraryAttributeTypes,
  fetchLibraryInterfaceTypes,
  fetchLibraryTerminals,
  fetchLibraryTransportTypes,
  fetchQuantityDatums,
  fetchSubProjects,
} from "../../../redux/store/library/librarySlice";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { defaultFilter, VisualFilterData } from "../../../models/application/VisualFilter";
import { fetchProjects, ProjectState } from "store/reducers/projectReducer";
import { CommonState, fetchCompanies, fetchCompany, fetchParsers, fetchUser } from "store/reducers/commonReducer";
import { ViewType } from "lib";
import { HomeDialogs } from "./HomeDialogs";

interface Props {
  dispatch: Dispatch;
  projectState: ProjectState;
  commonState: CommonState;
}

/**
 * The main component for Mimir.
 * @param interface
 * @returns all the modules and components in the Mimir application.
 */
export const Home = ({ dispatch, projectState, commonState }: Props) => {
  const [filter, setFilter] = useLocalStorage("visual_filter", defaultFilter);
  const inspectorRef = useRef(null);

  const isDarkMode = false;
  const isTreeView = commonState.view === ViewType.Tree;
  const isFilterOpen = false;

  const activeMenu = useAppSelector(activeMenuSelector);
  const isProjectMenuOpen = activeMenu != null;

  const onFilterChange = (filter: VisualFilterData) => {
    setFilter(filter);
  };

  useEffect(() => {
    dispatch(fetchCompany());
    // dispatch(fetchSubProjects());
    // dispatch(fetchLibraryInterfaceTypes());
    // dispatch(fetchLibraryTransportTypes());
    // dispatch(fetchLibraryTerminals());
    // dispatch(fetchLibraryAttributeTypes());
    // dispatch(search(""));
    // dispatch(fetchLibrary());
    dispatch(fetchCompanies());
    dispatch(fetchParsers());
    dispatch(fetchUser());
    dispatch(fetchProjects({ name: "" }));
    // dispatch(fetchQuantityDatums());
  }, [dispatch]);

  useEffect(() => {
    ToggleColorProfile(isDarkMode);
  }, [isDarkMode, isTreeView]);

  return (
    <>
      <HeaderComponent />
      {commonState.view === ViewType.Home ? (
        <StartPage />
      ) : (
        <>
          <ToolbarComponent isTreeView={commonState.view === ViewType.Tree} dispatch={dispatch} />
          {commonState.view === ViewType.Tree && <ExplorerTreeModule dispatch={dispatch} />}
          {commonState.view === ViewType.Block && <ExplorerBlockModule dispatch={dispatch} />}
          <FlowModule inspectorRef={inspectorRef} flowView={commonState.view} dispatch={dispatch} filter={filter} />
          <InspectorModule inspectorRef={inspectorRef} dispatch={dispatch} />
          <LibraryModule dispatch={dispatch} />
          {isFilterOpen && <VisualFilterComponent filter={filter} onFilterChange={onFilterChange} />}
          <ValidationModule />
        </>
      )}
      {isProjectMenuOpen && <ProjectSubMenus activeMenu={activeMenu} />}
      <HomeDialogs dispatch={dispatch} commonState={commonState} projectState={projectState} />
      <ErrorModule />
    </>
  );
};
