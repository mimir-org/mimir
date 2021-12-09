import * as selectors from "./helpers/selectors";
import { Dispatch } from "redux";
import { MimirLogo } from "../../assets/icons/mimir";
import { ToolBarComponent, AvatarComponent, ProjectMenuHeader } from ".";
import { CompanyLogoBox, HeaderBox, LogoBox } from "./styled";
import { GetCompanyLogoForHeader, GetSelectedNode, IsStartPage } from "../../helpers";
import { Project } from "../../models";
import { useAppSelector } from "../../redux/store";

interface Props {
  project: Project;
  projectMenuOpen: boolean;
  dispatch: Dispatch;
}

/**
 * The top header in Mimir.
 * @param interface
 * @returns a banner with the Mimir and company logo, and buttons for project/user menus.
 */
const HeaderComponent = ({ project, projectMenuOpen, dispatch }: Props) => {
  const filterOpen = useAppSelector(selectors.filterSelector);
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
          isTreeView={treeView}
          visualFilterOpen={filterOpen}
          isElectro={electro}
          location3DActive={location3DActive}
          selectedNode={GetSelectedNode()}
          dispatch={dispatch}
        />
      )}
    </>
  );
};

export default HeaderComponent;
