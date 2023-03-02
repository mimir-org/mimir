import { Home } from "../home/Home";
import { GlobalStyle } from "../../compLibrary/GlobalStyle";
import { LoginBox } from "./App.styled";
import { LogoutIcon } from "../../assets/icons/header";
import { TextResources } from "../../assets/text/TextResources";
import { useDispatch } from "react-redux";
import { IPublicClientApplication } from "@azure/msal-browser";
import { msalInstance } from "../..";
import { AuthenticatedTemplate, MsalProvider, UnauthenticatedTemplate } from "@azure/msal-react";
import { Button } from "../../compLibrary/buttons/standard";
import { Spinner, SpinnerWrapper } from "../../compLibrary/spinner/";

type AppProps = {
  pca: IPublicClientApplication;
};

export const App = ({ pca }: AppProps) => {
  const dispatch = useDispatch();

  const login = () => msalInstance && msalInstance.loginRedirect();

  // TODO: Reimplement websockets below when new types are implemented
  // const websocket = new WebSocket();
  // websocket.setDispatcher(dispatch);
  // websocket.setProjectState(projectState);
  // websocket.start();

  return (
    <>
      {pca ? (
        <MsalProvider instance={pca}>
          <AuthenticatedTemplate>
            <GlobalStyle />
            <SpinnerWrapper fetching={false}>
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
      ) : (
        <>
          <GlobalStyle />
          <SpinnerWrapper fetching={false}>
            <Spinner variant="big" />
          </SpinnerWrapper>
          <Home dispatch={dispatch} />
        </>
      )}
    </>
  );
};
