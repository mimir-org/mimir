import * as selectors from "./helpers/selectors";
import { MimirLogo } from "../../assets/icons/mimir/";
import { ToolBar, Avatar, ProjectMenuHeader } from "./";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { CompanyLogoBox, HeaderBox, LogoBox } from "./styled";
import { GetCompanyLogoForHeader } from "../../helpers";
import { VIEW_TYPE } from "../../models/project";

const Header = () => {
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
  const flowView = useAppSelector(selectors.flowViewSelector);
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
        <Avatar userMenuOpen={userMenuOpen} userState={userState} dispatch={dispatch} />
      </HeaderBox>
      {flowView !== VIEW_TYPE.STARTPAGE && (
        <ToolBar
          project={project}
          libOpen={libOpen}
          explorerOpen={explorerOpen}
          treeView={treeView}
          visualFilter={filterOpen}
          electro={electro}
        />
      )}
    </>
  );
};

export default Header;
