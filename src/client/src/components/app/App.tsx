import { Switch, Route } from "react-router";
import { Header, Home, Login } from "..";
import { Spinner, SpinnerWrapper } from "../../componentLibrary/animated";
import { GlobalStyle } from "../../componentLibrary";
import { AppBox } from "../../componentLibrary/box/app";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { ProjectState } from "../../redux/store/project/types";
import { LibraryState } from "../../redux/store/library/types";
import { UserState } from "../../redux/store/user/types";
import { CommonState } from "../../redux/store/common/types";

const App = () => {
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

  const isFetching = () => {
    if (
      projectState.fetching ||
      libraryState.fetching ||
      userState.fetching ||
      commonState.fetching
    )
      return "loading";
    return "";
  };

  return (
    <>
      <Header />
      <GlobalStyle />
      <SpinnerWrapper loading={isFetching()}>
        <Spinner />
      </SpinnerWrapper>
      <AppBox loading={isFetching()}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route path="/home/:type" component={Home} />
        </Switch>
      </AppBox>
    </>
  );
};

export default App;
