import { Home } from "./Home/Home";
import { GlobalStyle } from "../../compLibrary/GlobalStyle";
import { useAppDispatch, useAppSelector, fetchingSelector, companySelector } from "store";
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
import { MimirorgThemeProvider, LogoutIcon, useLocalStorage } from "@mimirorg/component-library";
import { CreateId } from "lib";

type AppProps = {
  pca: IPublicClientApplication;
};

export const App = ({ pca }: AppProps) => {
  const dispatch = useAppDispatch();
  const company = useAppSelector(companySelector);
  const [domain, setDomain] = useLocalStorage("domain", null);

  useEffect(() => {
    dispatch(fetchCompany());
  }, [dispatch]);

  useEffect(() => {
    if (company != null) {
      setDomain(company.domain);
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
    }
  }, [company, dispatch]);

  const isFetching = useAppSelector(fetchingSelector);
  const login = () => msalInstance && msalInstance.loginRedirect();

  return (
    <>
      {company && (
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
      )}
    </>
  );
};
