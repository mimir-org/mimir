import * as selectors from "./helpers/selectors";
import { MimirLogo } from "../../assets/icons/mimir";
import { ToolBarComponent, AvatarComponent, ProjectMenuHeader } from ".";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { CompanyLogoBox, HeaderBox, LogoBox } from "./styled";
import { GetCompanyLogoForHeader, GetSelectedNode, IsStartPage } from "../../helpers";

/**
 * The top header in Mimir.
 * @returns a banner with the Mimir and company logo, and buttons for project/user menus.
 */
const HeaderComponent = () => {
  const dispatch = useAppDispatch();
  const project = useAppSelector(selectors.projectSelector);
  const filterOpen = useAppSelector(selectors.filterSelector);
  const projectMenuOpen = useAppSelector(selectors.projectMenuSelector);
  const userMenuOpen = useAppSelector(selectors.userMenuSelector);
  const libOpen = useAppSelector(selectors.libOpenSelector);
  const explorerOpen = useAppSelector(selectors.explorerSelector);
  const treeView = useAppSelector(selectors.treeSelector);
  const electro = useAppSelector(selectors.electroSelector);
  const userState = useAppSelector(selectors.userStateSelector);
  const location3DActive = useAppSelector(selectors.location3DSelector);
  const company = process.env.REACT_APP_COMPANY;

  return (
    <>
      <HeaderBox id="Header">
        <LogoBox>
          <img src={MimirLogo} alt="mimir-logo" />
        </LogoBox>
        <ProjectMenuHeader projectMenuOpen={projectMenuOpen} project={project} dispatch={dispatch} />
        <CompanyLogoBox>
          <img src={GetCompanyLogoForHeader(company)} alt="logo" />
        </CompanyLogoBox>
        <AvatarComponent userMenuOpen={userMenuOpen} userState={userState} dispatch={dispatch} />
      </HeaderBox>
      {!IsStartPage() && (
        <ToolBarComponent
          project={project}
          libOpen={libOpen}
          explorerOpen={explorerOpen}
          treeView={treeView}
          visualFilter={filterOpen}
          electro={electro}
          location3DActive={location3DActive}
          selectedNode={GetSelectedNode()}
          dispatch={dispatch}
        />
      )}
    </>
  );
};

export default HeaderComponent;
