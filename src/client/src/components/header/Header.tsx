import { MimirLogo } from "../../assets/icons/mimir/";
import { ToolBar, Avatar, ProjectMenu } from "./";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { CompanyLogoBox, HeaderBox, LogoBox } from "./styled";
import { GetCompanyLogoForHeader } from "../../helpers";
import {
  projectMenuSelector,
  electroSelector,
  explorerSelector,
  treeFilterSelector,
  blockFilterSelector,
  libOpenSelector,
  treeSelector,
  projectSelector,
  userMenuSelector,
  userStateSelector,
} from "../../redux/store";

const Header = () => {
  const dispatch = useAppDispatch();
  const project = useAppSelector(projectSelector);
  const treeFilterOpen = useAppSelector(treeFilterSelector);
  const blockFilteOpen = useAppSelector(blockFilterSelector);
  const projectMenuOpen = useAppSelector(projectMenuSelector);
  const userMenuOpen = useAppSelector(userMenuSelector);
  const libOpen = useAppSelector(libOpenSelector);
  const explorerOpen = useAppSelector(explorerSelector);
  const treeView = useAppSelector(treeSelector);
  const electro = useAppSelector(electroSelector);
  const userState = useAppSelector(userStateSelector);
  const company = process.env.REACT_APP_COMPANY;

  return (
    <>
      <HeaderBox id="Header">
        <Avatar userMenuOpen={userMenuOpen} userState={userState} dispatch={dispatch} />
        <CompanyLogoBox>
          <img src={GetCompanyLogoForHeader(company)} alt="logo" />
        </CompanyLogoBox>
        <ProjectMenu projectMenuOpen={projectMenuOpen} project={project} dispatch={dispatch} />
        <LogoBox>
          <img src={MimirLogo} alt="mimir-logo" />
        </LogoBox>
      </HeaderBox>

      <ToolBar
        libOpen={libOpen}
        explorerOpen={explorerOpen}
        treeView={treeView}
        treeFilter={treeFilterOpen}
        blockFilter={blockFilteOpen}
        electro={electro}
      />
    </>
  );
};

export default Header;
