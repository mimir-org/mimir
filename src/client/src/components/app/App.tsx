import { Home } from "../home/Home";
import { GlobalStyle } from "../../compLibrary/GlobalStyle";
import { isFetchingSelector, projectStateSelector, useAppSelector } from "../../redux/store";
import { LoginBox } from "./App.styled";
import { LogoutIcon } from "../../assets/icons/header";
import { TextResources } from "../../assets/text/TextResources";
import { WebSocket } from "../../models";
import { useDispatch } from "react-redux";
import { IPublicClientApplication } from "@azure/msal-browser";
import { msalInstance } from "../..";
import { AuthenticatedTemplate, MsalProvider, UnauthenticatedTemplate } from "@azure/msal-react";
import { Button } from "../../compLibrary/buttons";
import { Spinner, SpinnerWrapper } from "../../compLibrary/spinner/";

type AppProps = {
  pca: IPublicClientApplication;
};

export const App = ({ pca }: AppProps) => {
  const dispatch = useDispatch();
  const isFetching = useAppSelector(isFetchingSelector);
  const projectState = useAppSelector(projectStateSelector);

  const login = () => msalInstance.loginRedirect();

  const websocket = new WebSocket();
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
          <Button text={TextResources.LOGIN} onClick={login} icon={LogoutIcon} />
        </LoginBox>
      </UnauthenticatedTemplate>
    </MsalProvider>
  );
};
