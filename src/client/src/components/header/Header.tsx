import * as Click from "./handlers";
import * as Icons from "../../assets/icons/header";
import { ToolBar } from "./";
import { MenuMainHeader } from "../../compLibrary/box/menus";
import { HeaderBox, LogoBox } from "../../compLibrary/box/header/";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { CompanyLogoBox, ProjectBox, UserBox } from "./styled";
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
} from "../../redux/store";

const Header = () => {
  const dispatch = useAppDispatch();
  const project = useAppSelector(projectSelector);
  const treeFilterMenuOpen = useAppSelector(treeFilterSelector);
  const blockFilterMenuOpen = useAppSelector(blockFilterSelector);
  const projectMenuOpen = useAppSelector(projectMenuSelector);
  const userMenuOpen = useAppSelector(userMenuSelector);
  const libOpen = useAppSelector(libOpenSelector);
  const explorerOpen = useAppSelector(explorerSelector);
  const treeView = useAppSelector(treeSelector);
  const electro = useAppSelector(electroSelector);
  const company = process.env.REACT_APP_COMPANY;

  return (
    <>
      <HeaderBox id="Header">
        <MenuMainHeader>
          <UserBox isOpen={userMenuOpen} onClick={() => Click.OnUser(dispatch, userMenuOpen)}>
            <img src={Icons.User} alt="icon" className="icon" onClick={() => Click.OnUser(dispatch, userMenuOpen)} />
          </UserBox>
          <CompanyLogoBox>
            <img src={GetCompanyLogoForHeader(company)} alt="logo" />
          </CompanyLogoBox>
        </MenuMainHeader>

        <ProjectBox isOpen={projectMenuOpen} onClick={() => Click.OnProject(dispatch, projectMenuOpen)}>
          {project && project.name}
        </ProjectBox>

        <LogoBox>
          <img src={Icons.Mimir} alt="mimir-icon" />
        </LogoBox>
      </HeaderBox>
      <ToolBar
        libOpen={libOpen}
        explorerOpen={explorerOpen}
        treeView={treeView}
        treeFilter={treeFilterMenuOpen}
        blockFilter={blockFilterMenuOpen}
        electro={electro}
      />
    </>
  );
};

export default Header;
