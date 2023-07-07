// import { activeMenuSelector } from "redux/store";
import { useEffect, useRef } from "react";
import { StartPage } from "../Start/StartPage";
// import { InspectorModule } from "../../../modules/inspector/InspectorModule";
import { LibraryModule } from "../../../modules/library/LibraryModule";
// import { search } from "../../redux/store/project/actions";
import { FlowModule } from "../../flow/FlowModule";
import { ErrorModule } from "../../../modules/error";
// import { ValidationModule } from "../../../modules/validation";
import { ExplorerTreeModule, ExplorerBlockModule } from "../../../modules/explorer";
import { ToggleColorProfile } from "../../../helpers/ToggleColorProfile";
import { VisualFilterComponent } from "../../menus/filterMenu/VisualFilterComponent";
import { ToolbarComponent } from "../../toolbar/ToolbarComponent";
// import { fetchCompanies, fetchCompany, fetchParsers } from "../../redux/store/common/commonSlice";
import { HeaderComponent } from "../../header/HeaderComponent";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { defaultFilter, VisualFilterData } from "../../../models/application/VisualFilter";
import { CommonState, setDialogType } from "store/reducers/commonReducer";
import { LibraryState } from "store/reducers/libraryReducer";
import { DialogType, Project, ViewType } from "lib";
import { HomeDialogs } from "./HomeDialogs";
import {
  commonStateSelector,
  libraryStateSelector,
  projectSelector,
  projectListSelector,
  useAppDispatch,
  useAppSelector,
} from "store";
import { WebSocket } from "models";
import { createNewProject } from "components/handlers/ProjectHandlers";
import { InspectorModule } from "components/modules/inspector/InspectorModule";

/**
 * The main component for Mimir.
 * @param interface
 * @returns all the modules and components in the Mimir application.
 */
export const Home = () => {
  const [filter, setFilter] = useLocalStorage("visual_filter", defaultFilter);
  const inspectorRef = useRef(null);

  const dispatch = useAppDispatch();
  const project = useAppSelector<Project>(projectSelector);
  const projects = useAppSelector<Project[]>(projectListSelector);
  const commonState = useAppSelector<CommonState>(commonStateSelector);
  const libraryState = useAppSelector<LibraryState>(libraryStateSelector);

  const websocket = new WebSocket();
  websocket.setDispatcher(dispatch);
  websocket.setProject(project);
  websocket.start();

  const isDarkMode = false;
  // const isTreeView = commonState.view === ViewType.Tree;
  const isFilterOpen = false;

  const onFilterChange = (filter: VisualFilterData) => {
    setFilter(filter);
  };

  const onDarkMode = (value: boolean) => {
    console.log("DARK-MODE", value);
  };

  const onLogOut = () => {
    console.log("LOG OUT");
  };

  const onOpenClick = (dialogType: DialogType) => {
    dispatch(setDialogType({ dialog: dialogType }));
  };

  // useEffect(() => {
  //   // console.log("Use effect Home");
  //   ToggleColorProfile(isDarkMode);
  //   // updateFlowNodesFromState(flowRef, project, commonState.view);
  //   // updateFlowEdgesFromState(flowRef, project, commonState.view);
  // }, [isDarkMode]);

  return (
    <>
      <HeaderComponent
        projectName={project?.name}
        userName={commonState.user?.name}
        userRole={commonState.user?.role}
        isDarkMode={false}
        onDarkMode={onDarkMode}
        onLogOut={onLogOut}
        onOpenClick={onOpenClick}
        isSubProject={project?.subProject ?? false}
        hasActiveProject={project != null ? true : false}
        hasSelectedNodes={project?.hasSelectedAspectObjects() ?? false}
      />
      {commonState.view === ViewType.Home ? (
        <StartPage />
      ) : (
        <>
          <ToolbarComponent isVisualFilterOpen={false} />
          {commonState.view === ViewType.Tree && <ExplorerTreeModule dispatch={dispatch} />}
          {commonState.view === ViewType.Block && <ExplorerBlockModule dispatch={dispatch} />}
          <FlowModule />
          <InspectorModule />
          {/* <AnimatedModule
            content="<div><p>Her er tekst</p><p>Her er mer tekst</p></div>"
            trigger={<InspectorModuleTrigger name="Inspector" />}
            direction="vertical"
            height={450}
            initialHeight={0}
          /> */}
          {/* <CalendarComponent /> */}
          <LibraryModule />
          {isFilterOpen && <VisualFilterComponent filter={filter} onFilterChange={onFilterChange} />}
          {/* <ValidationModule  /> */}
        </>
      )}
      {commonState.company != null && (
        <HomeDialogs
          dispatch={dispatch}
          commonState={commonState}
          projects={projects}
          libraryState={libraryState}
          onCreateProject={(name, description) => {
            createNewProject(commonState.company.domain, name, "reidar.liabo@bouvet.no", description, dispatch);
          }}
        />
      )}
      <ErrorModule />
    </>
  );
};
