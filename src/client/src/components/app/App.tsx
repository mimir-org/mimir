import { Switch, Route, useHistory } from "react-router";
import { Header, Home } from "..";
import { Spinner, SpinnerWrapper } from "../../compLibrary/animated";
import { GlobalStyle } from "../../compLibrary";
import { AppBox } from "../../compLibrary/box/app";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { ProjectState } from "../../redux/store/project/types";
import { LibraryState } from "../../redux/store/library/types";
import { UserState } from "../../redux/store/user/types";
import { CommonState } from "../../redux/store/common/types";
import { TypeEditorState } from "../../typeEditor/redux/types";
import { Login } from "../../compLibrary/box/menus";
import { LoginIcon } from "../../assets/icons/login";
import { TextResources } from "../../assets/text";

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
