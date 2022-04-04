/* eslint-disable react-hooks/exhaustive-deps */
import * as selectors from "./helpers/selectors";
import { Dispatch } from "redux";
import { useEffect, useRef } from "react";
import { StartPage } from "../start/StartPage";
import { InspectorModule } from "../../modules/inspector/InspectorModule";
import { LibraryModule } from "../../modules/library/LibraryModule";
import { ProjectSubMenus } from "../menus/projectMenu/ProjectSubMenus";
import { search } from "../../redux/store/project/actions";
import { FlowModule } from "../flow";
import { ErrorModule } from "../../modules/error";
import { ValidationModule } from "../../modules/validation";
import { TypeEditorComponent } from "../../typeEditor";
import { fetchLibrary, fetchLibraryInterfaceTypes, fetchLibraryTransportTypes } from "../../redux/store/library/librarySlice";
import { HeaderComponent } from "../header/HeaderComponent";
import { ExplorerModule } from "../../modules/explorer/ExplorerModule";
import { fetchUser } from "../../redux/store/user/userSlice";
import { changeActiveMenu } from "../menus/projectMenu/components/subMenus/redux/menuSlice";
import { MENU_TYPE, VIEW_TYPE, ViewType } from "../../models/project";
import { ToggleDarkModeColor } from "../../helpers";
import { isActiveViewSelector, useAppSelector, useParametricAppSelector } from "../../redux/store";
import { fetchBlobData } from "../../typeEditor/redux/typeEditorSlice";
import {
  fetchCollaborationPartners,
  fetchCombinedAttributeFilters,
  fetchParsers,
  fetchStatuses,
} from "../../redux/store/common/commonSlice";

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
  const inspectorRef = useRef(null);
  const isStartPage = useParametricAppSelector(isActiveViewSelector, VIEW_TYPE.STARTPAGE);

  useEffect(() => {
    dispatch(fetchLibraryInterfaceTypes());
    dispatch(fetchLibraryTransportTypes());
    dispatch(search(""));
    dispatch(fetchLibrary());
    dispatch(fetchCollaborationPartners());
    dispatch(fetchParsers());
    dispatch(fetchStatuses());
    dispatch(fetchCombinedAttributeFilters());
    dispatch(fetchBlobData());
    dispatch(fetchUser());
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
    ToggleDarkModeColor(isDarkMode);
  }, [isDarkMode]);

  return (
    <>
      <HeaderComponent />
      {isStartPage ? (
        <StartPage />
      ) : (
        <>
          <ExplorerModule dispatch={dispatch} />
          <FlowModule project={projectState?.project} inspectorRef={inspectorRef} flowView={flowView} />
          <InspectorModule project={projectState?.project} inspectorRef={inspectorRef} dispatch={dispatch} />
          <LibraryModule dispatch={dispatch} />
          <TypeEditorComponent />
        </>
      )}
      <ProjectSubMenus />
      <ValidationModule />
      <ErrorModule />
    </>
  );
};
