import { useHistory } from "react-router";
import { Home } from "../home/";
import { GlobalStyle } from "../../compLibrary";
import { useAppSelector, projectStateSelector, isFetchingSelector } from "../../redux/store";
import { LoginBox } from "./styled";
import { LogoutIcon } from "../../assets/icons/header";
import { TextResources } from "../../assets/text";
import { WebSocket } from "../../models";
import { useDispatch } from "react-redux";
import { IPublicClientApplication } from "@azure/msal-browser";
import { ModelBuilderNavigationClient } from "../../models/webclient";
import { msalInstance } from "../..";
import { MsalProvider, AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { Button } from "../../compLibrary/buttons";
import { Spinner, SpinnerWrapper } from "../../compLibrary/animated";

type AppProps = {
  pca: IPublicClientApplication;
};

const App = ({ pca }: AppProps) => {
  const history = useHistory();
  const navigationClient = new ModelBuilderNavigationClient(history);
  pca.setNavigationClient(navigationClient);
  const projectState = useAppSelector(projectStateSelector);
  const isFetching = useAppSelector(isFetchingSelector);

  const login = () => {
    msalInstance.loginRedirect();
  };

  const websocket = new WebSocket();
  const dispatch = useDispatch();
  websocket.setDispatcher(dispatch);
  websocket.setProjectState(projectState);
  websocket.start();

  return (
    <MsalProvider instance={pca}>
      <AuthenticatedTemplate>
        <GlobalStyle />
        <SpinnerWrapper fetching={isFetching}>
          <Spinner />
        </SpinnerWrapper>
        <Home dispatch={dispatch} />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <LoginBox>
          <Button text={TextResources.Login_Label} onClick={login} icon={LogoutIcon} />
        </LoginBox>
      </UnauthenticatedTemplate>
    </MsalProvider>
  );
};

export default App;
