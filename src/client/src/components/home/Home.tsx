import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { ExplorerModule } from "../modules/explorerModule";
import { InspectorModule } from "../modules/inspectorModule";
import { LibraryModule } from "../modules/libraryModule";
import { AccountModule } from "../modules/accountModule";
import { FilterModule } from "../modules/filterModule";
import { getUser } from "../../redux/store/user/actions";
import { FlowModule } from "../flow";
import { FlowBox, HomeBox } from "../../componentLibrary";

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
      <AccountModule />
      <FilterModule />
      <LibraryModule />
    </HomeBox>
  );
};

export default Home;
