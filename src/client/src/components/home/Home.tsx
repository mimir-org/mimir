import { accountMenuOpenSelector, filterMenuOpenSelector, useAppDispatch, useAppSelector } from "../../redux/store";
import { useEffect } from "react";
import { useParams } from "react-router";
import { ExplorerModule } from "../../modules/explorer";
import { InspectorModule } from "../../modules/inspector";
import { LibraryModule } from "../../modules/library";
import { AccountMenu } from "../menus/accountMenu";
import { getUser } from "../../redux/store/user/actions";
import { search } from "../../redux/store/project/actions";
import { FlowModule } from "../flow";
import { ErrorModule } from "../../modules/error";
import { TypeEditorComponent } from "../../typeEditor";
import { getContractors, getStatuses, getAttributeFilters } from "../../redux/store/common/actions";
import { importLibraryInterfaceTypes, importLibraryTransportTypes } from "../../redux/store/library/actions";
import { IsBlockView } from "../flow/block/helpers";
import { TreeFilterMenu } from "../menus/filterMenu/tree";
import { BlockFilterMenu } from "../menus/filterMenu/block";

interface RouteParams {
  type: string;
}

/**
 * The main component for Mimir
 * @returns a JSX Element containing all the modules and components.
 */
const Home = () => {
  const dispatch = useAppDispatch();
  const accountMenuOpen = useAppSelector(accountMenuOpenSelector);
  const filterMenuOpen = useAppSelector(filterMenuOpenSelector);
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
      {!IsBlockView() && filterMenuOpen && <TreeFilterMenu />}
      {IsBlockView() && filterMenuOpen && <BlockFilterMenu />}
      <FlowModule route={params} dispatch={dispatch} />
      <InspectorModule />
      <LibraryModule />
      <TypeEditorComponent />
      <ErrorModule />
    </>
  );
};

export default Home;
