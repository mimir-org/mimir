import { useEffect, useRef, useState } from "react";
import { StartPage } from "../start/";
import { InspectorModule } from "../../modules/inspector";
import { LibraryModule } from "../../modules/library";
import { ProjectMenuComponent } from "../menus/projectMenu";
import { UserMenuComponent } from "../menus/userMenu";
import { search } from "../../redux/store/project/actions";
import { FlowModule } from "../flow";
import { ErrorModule } from "../../modules/error";
import { TypeEditorComponent } from "../../typeEditor";
import { getContractors, getStatuses, getAttributeFilters, getParsers } from "../../redux/store/common/actions";
import { importLibraryInterfaceTypes, importLibraryTransportTypes, searchLibrary } from "../../redux/store/library/actions";
import { getBlobData } from "../../typeEditor/redux/actions";
import { Header } from "../header";
import { ExplorerModule } from "../../modules/explorer/ExplorerModule";
import {
  projectMenuSelector,
  flowViewSelector,
  useAppDispatch,
  useAppSelector,
  userMenuSelector,
  // isFetchingSelector,
  projectStateSelector,
  useParametricAppSelector,
  isActiveMenuSelector,
} from "../../redux/store";
import { getUser } from "../../redux/store/user/actions";
import { OpenProjectMenu } from "../menus/projectMenu/subMenus/openProject";
import { changeActiveMenu } from "../menus/projectMenu/subMenus/redux/actions";
import { MENU_TYPE, ViewType, VIEW_TYPE } from "../../models/project";
import { CreateProjectMenu } from "../menus/projectMenu/subMenus/createProject";

/**
 * The main component for Mimir
 * @returns a JSX Element containing all the modules and components.
 */
const Home = () => {
  const [show, setShow] = useState(false);
  const dispatch = useAppDispatch();
  // const isFetching = useAppSelector(isFetchingSelector);
  const projectState = useAppSelector(projectStateSelector);
  const projectMenuOpen = useAppSelector(projectMenuSelector);
  const userMenuOpen = useAppSelector(userMenuSelector);
  const flowView = useAppSelector(flowViewSelector);
  const inspectorRef = useRef(null);
  const createProjectOpen = useParametricAppSelector(isActiveMenuSelector, MENU_TYPE.CREATE_PROJECT_MENU);
  const openProjectOpen = useParametricAppSelector(isActiveMenuSelector, MENU_TYPE.OPEN_PROJECT_MENU);

  useEffect(() => {
    dispatch(importLibraryInterfaceTypes());
    dispatch(importLibraryTransportTypes());
    dispatch(search(""));
    dispatch(searchLibrary(""));
    dispatch(getUser());
    dispatch(getContractors());
    dispatch(getParsers());
    dispatch(getStatuses());
    dispatch(getAttributeFilters());
    dispatch(getBlobData());
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true);
    }, 4300);
    if (show) {
      dispatch(changeActiveMenu(MENU_TYPE.OPEN_PROJECT_MENU));
    }
    return () => clearTimeout(timeout);
  }, [dispatch, show]);

  return (
    <>
      <Header />
      {projectMenuOpen && <ProjectMenuComponent />}
      {userMenuOpen && <UserMenuComponent />}
      {flowView === (VIEW_TYPE.STARTPAGE as ViewType) && (
        <>
          <StartPage />
          {openProjectOpen && show ? <OpenProjectMenu projectState={projectState} dispatch={dispatch} /> : null}
        </>
      )}
      {flowView !== VIEW_TYPE.STARTPAGE && (
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
    </>
  );
};

export default Home;
