import { useHistory } from "react-router";
import { Home } from "../home/";
import { Spinner, SpinnerWrapper } from "../../compLibrary/animated";
import { GlobalStyle } from "../../compLibrary";
import { useAppSelector, isFetchingSelector } from "../../redux/store";
import { LoginBox, AppBox } from "./styled";
import { LogoutIcon } from "../../assets/icons/header";
import { TextResources } from "../../assets/text";
import { WebSocket } from "../../models";
import { useDispatch } from "react-redux";

// MSAL imports
import { IPublicClientApplication } from "@azure/msal-browser";
import { ModelBuilderNavigationClient } from "../../models/webclient";
import { msalInstance } from "../..";
import { MsalProvider, AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";

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

  // Start the websocket endpoint
  const websocket = new WebSocket();
  const dispatch = useDispatch();
  websocket.setDispatcher(dispatch);
  websocket.start();

  return (
    <MsalProvider instance={pca}>
      <AuthenticatedTemplate>
        <GlobalStyle />
        <SpinnerWrapper fetching={isFetching} id="loader">
          <Spinner />
        </SpinnerWrapper>
        <AppBox fetching={isFetching} id="main">
          <Home />
        </AppBox>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <LoginBox onClick={login}>
          <img src={LogoutIcon} alt="icon" className="icon" />
          <p>{TextResources.Login_Label}</p>
        </LoginBox>
      </UnauthenticatedTemplate>
    </MsalProvider>
  );
};

export default App;
