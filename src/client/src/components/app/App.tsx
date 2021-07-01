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
import { TypeEditorState } from "../../redux/store/typeEditor/types";

// MSAL imports
import {
  MsalProvider,
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import { IPublicClientApplication } from "@azure/msal-browser";
import { ModelBuilderNavigationClient } from "../../models/webclient";
import { msalInstance } from "../..";

// Props
type AppProps = {
  pca: IPublicClientApplication;
};

const App = ({ pca }: AppProps) => {
  const history = useHistory();
  const navigationClient = new ModelBuilderNavigationClient(history);
  pca.setNavigationClient(navigationClient);

  const projectState = useSelector<RootState>(
    (state) => state.projectState
  ) as ProjectState;

  const libraryState = useSelector<RootState>(
    (state) => state.library
  ) as LibraryState;

  const userState = useSelector<RootState>(
    (state) => state.library
  ) as UserState;

  const commonState = useSelector<RootState>(
    (state) => state.commonState
  ) as CommonState;

  const typeEditorState = useSelector<RootState>(
    (state) => state.typeEditor
  ) as TypeEditorState;

  const isFetching = () => {
    if (
      projectState.fetching ||
      libraryState.fetching ||
      userState.fetching ||
      commonState.fetching ||
      typeEditorState.fetching
    )
      return "loading";
    return "";
  };

  const login = () => {
    msalInstance.loginRedirect();
  };

  return (
    <MsalProvider instance={pca}>
      <AuthenticatedTemplate>
        <Header />
        <GlobalStyle />
        <SpinnerWrapper loading={isFetching()}>
          <Spinner />
        </SpinnerWrapper>
        <AppBox loading={isFetching()}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route path="/home/:type" component={Home} />
          </Switch>
        </AppBox>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <div onClick={login}>Logg inn</div>
      </UnauthenticatedTemplate>
    </MsalProvider>
  );
};

export default App;
