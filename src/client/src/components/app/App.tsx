import { Home } from "../home/Home";
import { GlobalStyle } from "../../compLibrary";
import { isFetchingSelector, projectStateSelector, useAppSelector } from "../../redux/store";
import { LoginBox } from "./App.styled";
import { LogoutIcon } from "../../assets/icons/header";
import { TextResources } from "../../assets/text/TextResources";
import { WebSocket } from "../../models";
import { useDispatch } from "react-redux";
import { IPublicClientApplication } from "@azure/msal-browser";
import { msalInstance } from "../..";
import { AuthenticatedTemplate, MsalProvider, UnauthenticatedTemplate } from "@azure/msal-react";
import { Spinner, SpinnerWrapper } from "../../compLibrary/animated";
import { Button } from "../../compLibrary/buttons";

type AppProps = {
  pca: IPublicClientApplication;
};

export const App = ({ pca }: AppProps) => {
  const isFetching = useAppSelector(isFetchingSelector);
  const projectState = useAppSelector(projectStateSelector);

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
          <Spinner variant="big" />
        </SpinnerWrapper>
        <Home dispatch={dispatch} />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <LoginBox>
          <Button text={TextResources.LOGIN_LABEL} onClick={login} icon={LogoutIcon} />
        </LoginBox>
      </UnauthenticatedTemplate>
    </MsalProvider>
  );
};
