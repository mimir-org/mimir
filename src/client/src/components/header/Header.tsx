import { MimirLogo } from "../../assets/icons/mimir/";
import { ToolBar, Avatar, ProjectMenuHeader } from "./";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { CompanyLogoBox, HeaderBox, LogoBox } from "./styled";
import { GetCompanyLogoForHeader } from "../../helpers";
import { VIEW_TYPE } from "../../models/project";
import {
  projectMenuSelector,
  electroSelector,
  explorerSelector,
  filterSelector,
  libOpenSelector,
  treeSelector,
  projectSelector,
  userMenuSelector,
  userStateSelector,
  flowViewSelector,
} from "../../redux/store";

const Header = () => {
  const dispatch = useAppDispatch();
  const project = useAppSelector(projectSelector);
  const filterOpen = useAppSelector(filterSelector);
  const projectMenuOpen = useAppSelector(projectMenuSelector);
  const userMenuOpen = useAppSelector(userMenuSelector);
  const libOpen = useAppSelector(libOpenSelector);
  const explorerOpen = useAppSelector(explorerSelector);
  const treeView = useAppSelector(treeSelector);
  const electro = useAppSelector(electroSelector);
  const userState = useAppSelector(userStateSelector);
  const flowView = useAppSelector(flowViewSelector);
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
