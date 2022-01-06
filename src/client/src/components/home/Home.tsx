/* eslint-disable react-hooks/exhaustive-deps */
import * as selectors from "./helpers/selectors";
import { Dispatch } from "redux";
import { useEffect, useRef } from "react";
import { StartPage } from "../start/";
import { InspectorModule } from "../../modules/inspector";
import { LibraryModule } from "../../modules/library";
import { ProjectMenuComponent } from "../menus/projectMenu";
import { UserMenuComponent } from "../menus/userMenu";
import { search } from "../../redux/store/project/actions";
import { FlowModule } from "../flow";
import { ErrorModule } from "../../modules/error";
import { ValidationModule } from "../../modules/validation";
import { TypeEditorComponent } from "../../typeEditor";
import { getCollaborationPartners, getStatuses, getAttributeFilters, getParsers } from "../../redux/store/common/actions";
import { importLibraryInterfaceTypes, importLibraryTransportTypes, searchLibrary } from "../../redux/store/library/actions";
import { getBlobData } from "../../typeEditor/redux/actions";
import { HeaderComponent } from "../header";
import { ExplorerModule } from "../../modules/explorer/ExplorerModule";
import { getUser } from "../../redux/store/user/actions";
import { OpenProjectMenu } from "../menus/projectMenu/subMenus/openProject";
import { changeActiveMenu } from "../menus/projectMenu/subMenus/redux/actions";
import { MENU_TYPE, ViewType, VIEW_TYPE } from "../../models/project";
import { IsStartPage, SetDarkModeColor } from "../../helpers";
import { CreateProjectMenu } from "../menus/projectMenu/subMenus/createProject";
import { commonStateSelector, useAppSelector, useParametricAppSelector } from "../../redux/store";
import { ImportProjectFileMenu } from "../menus/projectMenu/subMenus/importProjectFile";
import { InstructionBoxComponent } from "../start/instructionBox";

interface Props {
  dispatch: Dispatch;
}

/**
 * The main component for Mimir.
 * @param interface
 * @returns all the modules and components in the Mimir application.
 */
const Home = ({ dispatch }: Props) => {
  const projectState = useAppSelector(selectors.projectStateSelector);
  const projectMenuOpen = useAppSelector(selectors.projectMenuSelector);
  const userMenuOpen = useAppSelector(selectors.userMenuSelector);
  const flowView = useAppSelector(selectors.flowViewSelector);
  const darkMode = useAppSelector(selectors.darkModeSelector);
  const commonState = useAppSelector(commonStateSelector);
  const inspectorRef = useRef(null);
  const openProject = useParametricAppSelector(selectors.isActiveMenuSelector, MENU_TYPE.OPEN_PROJECT_MENU);
  const createProject = useParametricAppSelector(selectors.isActiveMenuSelector, MENU_TYPE.CREATE_PROJECT_MENU);
  const importProject = useParametricAppSelector(selectors.isActiveMenuSelector, MENU_TYPE.IMPORT_PROJECT_FILE_MENU);
  const instructionBox = useParametricAppSelector(selectors.isActiveMenuSelector, MENU_TYPE.INSTRUCTION_PROJECT_MENU);
  const showInstructionBox = instructionBox && !projectState?.project;

  useEffect(() => {
    dispatch(importLibraryInterfaceTypes());
    dispatch(importLibraryTransportTypes());
    dispatch(search(""));
    dispatch(searchLibrary(""));
    dispatch(getUser());
    dispatch(getCollaborationPartners());
    dispatch(getParsers());
    dispatch(getStatuses());
    dispatch(getAttributeFilters());
    dispatch(getBlobData());
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(changeActiveMenu(null));
    const timeout = setTimeout(() => {
      if (flowView === (VIEW_TYPE.STARTPAGE as ViewType)) {
        dispatch(changeActiveMenu(MENU_TYPE.OPEN_PROJECT_MENU));
      }
    }, 2500);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    SetDarkModeColor(darkMode);
  }, [darkMode]);

  return (
    <>
      <HeaderComponent project={projectState?.project} projectMenuOpen={projectMenuOpen} dispatch={dispatch} />
      {projectMenuOpen && <ProjectMenuComponent projectState={projectState} dispatch={dispatch} />}
      {userMenuOpen && <UserMenuComponent darkMode={darkMode} dispatch={dispatch} />}
      {IsStartPage() ? (
        <>
          <StartPage />
          {openProject && <OpenProjectMenu projectState={projectState} dispatch={dispatch} />}
          {createProject && <CreateProjectMenu dispatch={dispatch} />}
          {importProject && <ImportProjectFileMenu dispatch={dispatch} parsers={commonState?.parsers} />}
          {showInstructionBox && <InstructionBoxComponent />}
        </>
      ) : (
        <>
          <ExplorerModule dispatch={dispatch} />
          <FlowModule project={projectState?.project} inspectorRef={inspectorRef} flowView={flowView} />
          <InspectorModule project={projectState?.project} inspectorRef={inspectorRef} dispatch={dispatch} />
          <LibraryModule project={projectState?.project} dispatch={dispatch} />
          <TypeEditorComponent />
        </>
      )}
      <ErrorModule projectState={projectState} dispatch={dispatch} />
      <ValidationModule dispatch={dispatch} />
    </>
  );
};

export default Home;
