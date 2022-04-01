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
import { MENU_TYPE, VIEW_TYPE } from "../../models/project";
import { ToggleDarkModeColor } from "../../helpers/ToggleDarkModeColor";
import { isActiveViewSelector, useAppSelector, useParametricAppSelector } from "../../redux/store";
import { fetchBlobData } from "../../typeEditor/redux/typeEditorSlice";
import { VisualFilterComponent } from "../menus/filterMenu/VisualFilterComponent";
import { ToolbarComponent } from "../toolbar/ToolbarComponent";
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
  const project = useAppSelector(selectors.projectSelector);
  const flowView = useAppSelector(selectors.flowViewSelector);
  const isDarkMode = useAppSelector(selectors.darkModeSelector);
  const isFilterOpen = useAppSelector(selectors.filterSelector);
  const isStartPage = useParametricAppSelector(isActiveViewSelector, VIEW_TYPE.STARTPAGE);
  const inspectorRef = useRef(null);

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
      if (isStartPage) dispatch(changeActiveMenu(MENU_TYPE.OPEN_PROJECT_MENU));
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
          <ToolbarComponent />
          <ExplorerModule dispatch={dispatch} />
          <FlowModule project={project} inspectorRef={inspectorRef} flowView={flowView} />
          <InspectorModule project={project} inspectorRef={inspectorRef} dispatch={dispatch} />
          <LibraryModule nodes={project?.nodes} dispatch={dispatch} />
          <TypeEditorComponent />
          {isFilterOpen && <VisualFilterComponent />}
        </>
      )}
      <ProjectSubMenus />
      <ValidationModule />
      <ErrorModule />
    </>
  );
};
