import { Switch, Route, useHistory } from "react-router";
import { Home } from "../home/";
import { Header } from "../header";
import { Spinner, SpinnerWrapper } from "../../compLibrary/animated";
import { GlobalStyle } from "../../compLibrary";
import { AppBox } from "../../compLibrary/box/app";
import { useAppSelector } from "../../redux/store";
import { Login } from "../../compLibrary/box/menus";
import { LoginIcon } from "../../assets/icons/login";
import { TextResources } from "../../assets/text";

// MSAL imports
import { IPublicClientApplication } from "@azure/msal-browser";
import { ModelBuilderNavigationClient } from "../../models/webclient";
import { msalInstance } from "../..";
import { MsalProvider, AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { isFetchingSelector } from "./selectors";

// Props
type AppProps = {
  pca: IPublicClientApplication;
};

const App = ({ pca }: AppProps) => {
  const history = useHistory();
  const navigationClient = new ModelBuilderNavigationClient(history);
  pca.setNavigationClient(navigationClient);

  const isFetching = useAppSelector(isFetchingSelector);

  const login = () => {
    msalInstance.loginRedirect();
  };

  return (
    <MsalProvider instance={pca}>
      <AuthenticatedTemplate>
        <Header />
        <GlobalStyle />
        <SpinnerWrapper fetching={isFetching}>
          <Spinner />
        </SpinnerWrapper>
        <AppBox fetching={isFetching}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route path="/home/:type" component={Home} />
          </Switch>
        </AppBox>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <Login onClick={login}>
          <img src={LoginIcon} alt="icon" className="icon" />
          <p>{TextResources.Login_Label}</p>
        </Login>
      </UnauthenticatedTemplate>
    </MsalProvider>
  );
};

export default App;
