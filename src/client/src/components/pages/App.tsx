import { Home } from "./Home/Home";
import { GlobalStyle } from "../../compLibrary/GlobalStyle";
import { useAppDispatch, useAppSelector, fetchingSelector } from "store";
import { LoginBox } from "./App.styled";
import { TextResources } from "../../assets/text/TextResources";

import { IPublicClientApplication } from "@azure/msal-browser";
import { msalInstance } from "../..";
import { AuthenticatedTemplate, MsalProvider, UnauthenticatedTemplate } from "@azure/msal-react";
import { Button } from "../../compLibrary/buttons/standard";
import { Spinner, SpinnerWrapper } from "../../compLibrary/spinner";
import { fetchProjects } from "store/reducers/projectReducer";
import { fetchCompanies, fetchCompany, fetchParsers, fetchUser } from "store/reducers/commonReducer";
import { fetchAspectObjects, fetchTerminals } from "store/reducers/libraryReducer";
import { useEffect } from "react";
import { MimirorgThemeProvider, LogoutIcon } from "@mimirorg/component-library";

type AppProps = {
  pca: IPublicClientApplication;
};

export const App = ({ pca }: AppProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCompany());
    // dispatch(fetchSubProjects());
    // dispatch(fetchLibraryInterfaceTypes());
    dispatch(fetchAspectObjects());
    dispatch(fetchTerminals());
    // dispatch(fetchLibraryAttributeTypes());
    // dispatch(search(""));
    // dispatch(fetchLibrary());
    dispatch(fetchCompanies());
    dispatch(fetchParsers());
    dispatch(fetchUser());
    dispatch(fetchProjects({ name: "" }));
    // dispatch(fetchQuantityDatums());
  }, [dispatch]);

  const isFetching = useAppSelector(fetchingSelector);
  const login = () => msalInstance && msalInstance.loginRedirect();

  return (
    <>
      {pca ? (
        <MsalProvider instance={pca}>
          <AuthenticatedTemplate>
            {/* <GlobalStyle /> */}
            <MimirorgThemeProvider>
              <SpinnerWrapper fetching={isFetching}>
                <Spinner variant="big" />
              </SpinnerWrapper>
              <Home />
            </MimirorgThemeProvider>
          </AuthenticatedTemplate>
          <UnauthenticatedTemplate>
            <LoginBox>
              <Button text={TextResources.LOGIN} onClick={login} icon={LogoutIcon} />
            </LoginBox>
          </UnauthenticatedTemplate>
        </MsalProvider>
      ) : (
        <>
          {/* <GlobalStyle /> */}
          <MimirorgThemeProvider>
            <SpinnerWrapper fetching={isFetching}>
              <Spinner variant="big" />
            </SpinnerWrapper>
            <Home />
          </MimirorgThemeProvider>
        </>
      )}
    </>
  );
};
