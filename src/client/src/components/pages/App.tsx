import { commonStateSelector, projectStateSelector } from "store/selectors";
import { Home } from "./Home/Home";
import { GlobalStyle } from "../../compLibrary/GlobalStyle";
import { isFetchingSelector } from "../../redux/store";
import { useAppDispatch, useAppSelector } from "store";
import { LoginBox } from "./App.styled";
import { LogoutIcon } from "../../assets/icons/header";
import { TextResources } from "../../assets/text/TextResources";
import { WebSocket } from "../../models";
import { IPublicClientApplication } from "@azure/msal-browser";
import { msalInstance } from "../..";
import { AuthenticatedTemplate, MsalProvider, UnauthenticatedTemplate } from "@azure/msal-react";
import { Button } from "../../compLibrary/buttons/standard";
import { Spinner, SpinnerWrapper } from "../../compLibrary/spinner";
import { ProjectState } from "store/reducers/projectReducer";
import { CommonState } from "store/reducers/commonReducer";

type AppProps = {
  pca: IPublicClientApplication;
};

export const App = ({ pca }: AppProps) => {
  const dispatch = useAppDispatch();
  const projectState = useAppSelector<ProjectState>(projectStateSelector);
  const commonState = useAppSelector<CommonState>(commonStateSelector);

  const isFetching = useAppSelector(isFetchingSelector);

  const login = () => msalInstance && msalInstance.loginRedirect();

  const websocket = new WebSocket();
  websocket.setDispatcher(dispatch);
  websocket.setProjectState(projectState);
  websocket.start();

  return (
    <>
      {pca ? (
        <MsalProvider instance={pca}>
          <AuthenticatedTemplate>
            <GlobalStyle />
            <SpinnerWrapper fetching={isFetching}>
              <Spinner variant="big" />
            </SpinnerWrapper>
            <Home dispatch={dispatch} projectState={projectState} commonState={commonState} />
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
          <SpinnerWrapper fetching={isFetching}>
            <Spinner variant="big" />
          </SpinnerWrapper>
          <Home dispatch={dispatch} projectState={projectState} commonState={commonState} />
        </>
      )}
    </>
  );
};
