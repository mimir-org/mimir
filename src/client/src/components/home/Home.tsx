import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { ExplorerModule } from "../modules/explorerModule";
import { InspectorModule } from "../modules/inspectorModule";
import { LibraryModule } from "../modules/libraryModule";
import { AccountMenu } from "../menus/accountMenu";
import { FilterMenu } from "../menus/filterMenu";
import { getUser } from "../../redux/store/user/actions";
import { FlowModule } from "../flow";
import { FlowBox } from "../../componentLibrary/box/flow";
import { HomeBox } from "../../componentLibrary/box/home";

interface RouteParams {
  type: string;
}

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const params = useParams<RouteParams>();

  return (
    <HomeBox>
      <ExplorerModule />
      <FlowBox>
        <FlowModule route={params} />
        <InspectorModule />
      </FlowBox>
      <AccountMenu />
      <FilterMenu />
      <LibraryModule />
    </HomeBox>
  );
};

export default Home;
