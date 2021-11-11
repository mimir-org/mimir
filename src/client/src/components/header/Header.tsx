import * as Click from "./handlers";
import * as Icons from "../../assets/icons/header";
import { ToolBar } from "./";
import { MenuMainHeader } from "../../compLibrary/box/menus";
import { HeaderBox, LogoBox } from "../../compLibrary/box/header/";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { CompanyLogoBox } from "./styled";
import { GetCompanyLogoForHeader } from "../../helpers";
import {
  darkModeSelector,
  accountMenuSelector,
  electroSelector,
  explorerSelector,
  treeFilterSelector,
  blockFilterSelector,
  libOpenSelector,
  treeSelector,
  projectSelector,
} from "../../redux/store";

const Header = () => {
  const dispatch = useAppDispatch();
  const project = useAppSelector(projectSelector);
  const darkMode = useAppSelector(darkModeSelector);
  const treeFilterMenuOpen = useAppSelector(treeFilterSelector);
  const blockFilterMenuOpen = useAppSelector(blockFilterSelector);
  const accountMenuOpen = useAppSelector(accountMenuSelector);
  const libOpen = useAppSelector(libOpenSelector);
  const explorerOpen = useAppSelector(explorerSelector);
  const treeView = useAppSelector(treeSelector);
  const electro = useAppSelector(electroSelector);
  const company = process.env.REACT_APP_COMPANY;

  return (
    <>
      <HeaderBox id="Header">
        <MenuMainHeader isOpen={accountMenuOpen}>
          <CompanyLogoBox>
            <img src={GetCompanyLogoForHeader(company)} alt="logo" />
          </CompanyLogoBox>
          <div className="projectName" onClick={() => Click.OnAccount(dispatch, accountMenuOpen)}>
            {project && project.name}
          </div>
          <img src={Icons.User} alt="icon" className="icon" onClick={() => Click.OnAccount(dispatch, accountMenuOpen)} />
        </MenuMainHeader>
        <LogoBox>
          <img src={Icons.Mimir} alt="mimir-icon" onClick={() => Click.OnDarkMode(dispatch, darkMode)} />
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
