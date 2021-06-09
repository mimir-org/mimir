import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { ExplorerModule } from "../modules/explorerModule";
import { InspectorModule } from "../modules/inspectorModule";
import { LibraryModule } from "../modules/libraryModule";
import { AccountMenu } from "../menus/accountMenu";
import { FilterMenu } from "../menus/filterMenu";
import { getUser } from "../../redux/store/user/actions";
import { getContractors } from "../../redux/store/common/actions";
import { search } from "../../redux/store/project/actions";
import { FlowModule } from "../flow";
import { HomeBox } from "../../componentLibrary/box/home";
import { ErrorModule } from "../modules/errorModule";

interface RouteParams {
  type: string;
}

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
    dispatch(getContractors());
    dispatch(search(""));
  }, [dispatch]);

  const params = useParams<RouteParams>();

  return (
    <HomeBox>
      <ExplorerModule />
      <FlowModule route={params} />
      <InspectorModule />
      <AccountMenu />
      <FilterMenu />
      <LibraryModule />
      <ErrorModule />
    </HomeBox>
  );
};

export default Home;
