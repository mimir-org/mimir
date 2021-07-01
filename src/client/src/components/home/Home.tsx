import { useEffect } from "react";
import { useDispatch } from "react-redux";
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
import { AzureAD } from "react-aad-msal";
import { authProvider } from "../../providers/authProvider";
import { Token } from "../../models/webclient";

interface RouteParams {
  type: string;
}

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
    dispatch(getContractors());
    dispatch(getStatuses());
    dispatch(search(""));
  }, [dispatch]);

  const params = useParams<RouteParams>();
  const token = Token();
  console.log(token);

  return (
    <AzureAD provider={authProvider} forceLogin={token === null}>
      {token && (
        <>
          <ExplorerModule />
          <AccountMenu />
          <FilterMenu />
          <FlowModule route={params} />
          <InspectorModule />
          <LibraryModule />
          <ErrorModule />
        </>
      )}
    </AzureAD>
  );
};

export default Home;
