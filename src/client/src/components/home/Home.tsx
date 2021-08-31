import { RootState } from "../../redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { ExplorerModule } from "../modules/explorerModule";
import { InspectorModule } from "../modules/inspectorModule";
import { LibraryModule } from "../modules/libraryModule";
import { AccountMenu } from "../menus/accountMenu";
import { FilterMenu } from "../menus/filterMenu";
import { getUser } from "../../redux/store/user/actions";
import { getContractors, getStatuses } from "../../redux/store/common/actions";
import { search } from "../../redux/store/project/actions";
import { FlowModule } from "../flow";
import { ErrorModule } from "../modules/errorModule";
import {
  importLibraryInterfaceTypes,
  importLibraryTransportTypes,
} from "../../redux/store/library/actions";

interface RouteParams {
  type: string;
}

const Home = () => {
  const dispatch = useDispatch();

  const accountMenuOpen = useSelector<RootState>(
    (state) => state.menu.list[1].visible
  ) as boolean;

  const filterMenuOpen = useSelector<RootState>(
    (state) => state.menu.list[4].visible
  ) as boolean;

  useEffect(() => {
    dispatch(importLibraryInterfaceTypes());
    dispatch(importLibraryTransportTypes());
    dispatch(search(""));
    dispatch(getUser());
    dispatch(getContractors());
    dispatch(getStatuses());
  }, [dispatch]);

  const params = useParams<RouteParams>();

  return (
    <>
      <ExplorerModule />
      {accountMenuOpen && <AccountMenu />}
      {filterMenuOpen && <FilterMenu />}
      <FlowModule route={params} />
      <InspectorModule />
      <LibraryModule />
      <ErrorModule />
    </>
  );
};

export default Home;
