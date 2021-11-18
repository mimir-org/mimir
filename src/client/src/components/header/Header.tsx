import * as Click from "./handlers";
import * as Icons from "../../assets/icons/header";
import { ToolBar } from "./";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { CompanyLogoBox, ProjectBox, AvatarBox, HeaderBox, LogoBox } from "./styled";
import { GetCompanyLogoForHeader } from "../../helpers";
import { GetUserInitials } from "../menus/userMenu/helpers";
import { CollapseWhiteIcon, ExpandWhiteIcon } from "../../assets/icons/toogle";
import { TextResources } from "../../assets/text";
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
        <AvatarBox isOpen={userMenuOpen} onClick={() => Click.OnUser(dispatch, userMenuOpen)}>
          <p className={"initials"}>{GetUserInitials(userState?.user?.name)}</p>
          <img
            src={Icons.AvatarBackground}
            alt="profile"
            className="profile"
            onClick={() => Click.OnUser(dispatch, userMenuOpen)}
          />
          <img
            src={userMenuOpen ? CollapseWhiteIcon : ExpandWhiteIcon}
            alt="icon"
            className="toggle-icon"
            onClick={() => Click.OnUser(dispatch, userMenuOpen)}
          />
        </AvatarBox>
        <CompanyLogoBox>
          <img src={GetCompanyLogoForHeader(company)} alt="logo" />
        </CompanyLogoBox>
        <ProjectBox isOpen={projectMenuOpen} onClick={() => Click.OnProject(dispatch, projectMenuOpen)}>
          <p className="project-name">{project?.name ?? TextResources.Account_Project}</p>
          <img
            src={projectMenuOpen ? CollapseWhiteIcon : ExpandWhiteIcon}
            alt="icon"
            className="toggle-icon"
            onClick={() => Click.OnProject(dispatch, projectMenuOpen)}
          />
        </ProjectBox>
        <LogoBox>
          <img src={Icons.Mimir} alt="mimir-icon" />
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
