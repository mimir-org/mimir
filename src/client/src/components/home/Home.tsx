/* eslint-disable react-hooks/exhaustive-deps */
import * as Selectors from "./helpers/selectors";
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
import { IsStartPage } from "../../helpers";
import { CreateProjectMenu } from "../menus/projectMenu/subMenus/createProject";
import { useAppDispatch, useAppSelector, useParametricAppSelector } from "../../redux/store";

/**
 * The main component for Mimir.
 * @returns a JSX Element containing all the modules and components.
 */
const Home = () => {
  const dispatch = useAppDispatch();
  const projectState = useAppSelector(Selectors.projectStateSelector);
  const projectMenuOpen = useAppSelector(Selectors.projectMenuSelector);
  const userMenuOpen = useAppSelector(Selectors.userMenuSelector);
  const flowView = useAppSelector(Selectors.flowViewSelector);
  const inspectorRef = useRef(null);
  const createProjectOpen = useParametricAppSelector(Selectors.isActiveMenuSelector, MENU_TYPE.CREATE_PROJECT_MENU);
  const openProjectOpen = useParametricAppSelector(Selectors.isActiveMenuSelector, MENU_TYPE.OPEN_PROJECT_MENU);

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

  return (
    <>
      <HeaderComponent />
      {projectMenuOpen && <ProjectMenuComponent />}
      {userMenuOpen && <UserMenuComponent />}
      {IsStartPage() ? (
        <>
          <StartPage />
          {openProjectOpen && <OpenProjectMenu projectState={projectState} dispatch={dispatch} />}
        </>
      ) : (
        <>
          <ExplorerModule />
          <FlowModule inspectorRef={inspectorRef} flowView={flowView} />
          <InspectorModule inspectorRef={inspectorRef} />
          <LibraryModule />
          <TypeEditorComponent />
        </>
      )}
      {createProjectOpen && <CreateProjectMenu />}
      <ErrorModule />
      <ValidationModule />
    </>
  );
};

export default Home;
