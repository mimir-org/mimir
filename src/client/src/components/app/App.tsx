import { Switch, Route, useHistory } from "react-router";
import { Home } from "../home/";
import { Header } from "../header";
import { Spinner, SpinnerWrapper } from "../../compLibrary/animated";
import { GlobalStyle } from "../../compLibrary";
import { AppBox } from "../../compLibrary/box/app";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { ProjectState } from "../../redux/store/project/types";
import { LibraryState } from "../../redux/store/library/types";
import { UserState } from "../../redux/store/user/types";
import { CommonState } from "../../redux/store/common/types";
import { TypeEditorState } from "../../typeEditor/redux/types";
import { Login } from "../../compLibrary/box/menus";
import { LoginIcon } from "../../assets/icons/login";
import { TextResources } from "../../assets/text";
import { WebSocket } from "../../models";

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

  // Start the websocket endpoint
  const websocket = new WebSocket();
  const dispatch = useDispatch();
  websocket.setDispatcher(dispatch);
  websocket.start();

  const projectState = useSelector<RootState>((state) => state.projectState) as ProjectState;
  const libraryState = useSelector<RootState>((state) => state.library) as LibraryState;
  const userState = useSelector<RootState>((state) => state.library) as UserState;
  const commonState = useSelector<RootState>((state) => state.commonState) as CommonState;
  const typeEditorState = useSelector<RootState>((state) => state.typeEditor) as TypeEditorState;

  function isFetching() {
    return (
      projectState.fetching ||
      libraryState.fetching ||
      userState.fetching ||
      commonState.fetching ||
      typeEditorState.fetching
    );
  }

  const login = () => {
    msalInstance.loginRedirect();
  };

  return (
    <MsalProvider instance={pca}>
      <AuthenticatedTemplate>
        <Header />
        <GlobalStyle />
        <SpinnerWrapper fetching={isFetching()}>
          <Spinner />
        </SpinnerWrapper>
        <AppBox fetching={isFetching()}>
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
