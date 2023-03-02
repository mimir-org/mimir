import { Dispatch } from "redux";
import { useEffect, useRef } from "react";
import { StartPage } from "../start/StartPage";
import { InspectorModule } from "../../modules/inspector/InspectorModule";
import { LibraryModule } from "../../modules/library/LibraryModule";
import { search } from "../../redux/store/project/actions";
import { FlowModule } from "../flow/FlowModule";
import { ErrorModule } from "../../modules/error";
import { ValidationModule } from "../../modules/validation";
import { fetchUser } from "../../redux/store/user/userSlice";
import { VisualFilterComponent } from "../menus/filterMenu/VisualFilterComponent";
import { ToolbarComponent } from "../toolbar/ToolbarComponent";
import { fetchCompanies, fetchCompany, fetchParsers } from "../../redux/store/commonSlice";
import { HeaderComponent } from "../header/HeaderComponent";
import {
  fetchLibrary,
  fetchLibraryAttributeTypes,
  fetchLibraryTerminals,
  fetchQuantityDatums,
  fetchSubProjects,
} from "../../redux/store/library/librarySlice";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { defaultFilter, VisualFilterData } from "../../lib/models/application/VisualFilter";

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
  const isStartPage = false;
  const inspectorRef = useRef(null);

  const onFilterChange = (filter: VisualFilterData) => {
    setFilter(filter);
  };

  useEffect(() => {
    dispatch(fetchCompany());
    dispatch(fetchSubProjects());
    dispatch(fetchLibraryTerminals());
    dispatch(fetchLibraryAttributeTypes());
    dispatch(search(""));
    dispatch(fetchLibrary());
    dispatch(fetchCompanies());
    dispatch(fetchParsers());
    dispatch(fetchUser());
    dispatch(fetchQuantityDatums());
  }, [dispatch]);

  return (
    <>
      <HeaderComponent />
      {isStartPage ? (
        <StartPage />
      ) : (
        <>
          <ToolbarComponent isTreeView={true} dispatch={dispatch} />
          <FlowModule inspectorRef={inspectorRef} dispatch={dispatch} filter={filter} />
          <InspectorModule inspectorRef={inspectorRef} dispatch={dispatch} />
          <LibraryModule dispatch={dispatch} />
          <VisualFilterComponent filter={filter} onFilterChange={onFilterChange} />
          <ValidationModule />
        </>
      )}
      <ErrorModule />
    </>
  );
};
