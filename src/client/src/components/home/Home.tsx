import { RootState } from "../../redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { ExplorerModule } from "../../modules/explorer";
import { InspectorModule } from "../../modules/inspector";
import { LibraryModule } from "../../modules/library";
import { AccountMenu } from "../menus/accountMenu";
import { FilterMenu } from "../menus/filterMenu";
import { getUser } from "../../redux/store/user/actions";
import { search } from "../../redux/store/project/actions";
import { FlowModule } from "../flow";
import { ErrorModule } from "../../modules/error";
import { TypeEditorComponent } from "../../typeEditor";
import { getContractors, getStatuses, getAttributeFilters } from "../../redux/store/common/actions";
import { importLibraryInterfaceTypes, importLibraryTransportTypes } from "../../redux/store/library/actions";

interface RouteParams {
  type: string;
}

/**
 * The main component for Mimir
 * @returns a JSX Element containing all the modules and components.
 */
const Home = () => {
  const dispatch = useDispatch();
  const accountMenuOpen = useSelector<RootState>((state) => state.menu.accountMenuVisibility) as boolean;
  const filterMenuOpen = useSelector<RootState>((state) => state.menu.filterMenuVisibility) as boolean;
  const params = useParams<RouteParams>();

  useEffect(() => {
    dispatch(importLibraryInterfaceTypes());
    dispatch(importLibraryTransportTypes());
    dispatch(search(""));
    dispatch(getUser());
    dispatch(getContractors());
    dispatch(getStatuses());
    dispatch(getAttributeFilters());
  }, [dispatch]);

  return (
    <>
      <ExplorerModule />
      {accountMenuOpen && <AccountMenu />}
      {filterMenuOpen && <FilterMenu />}
      <FlowModule route={params} />
      <InspectorModule />
      <LibraryModule />
      <TypeEditorComponent />
      <ErrorModule />
    </>
  );
};

export default Home;
