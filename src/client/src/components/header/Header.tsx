import { useState } from "react";
import { useHistory } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import textResources from "../../textResources";
import SaveViewState from "./helpers/SaveViewState";
import { loadStateFromStorage } from "../../redux/store/localStorage/localStorage";
import {
  TreeviewIcon,
  BlockviewIcon,
  SwitchOnIcon,
  SwitchOffIcon,
} from "../../assets/index";
import {
  BlockviewWrapper,
  TreeviewWrapper,
  TitleWrapper,
  IconsWrapper,
  SwitchWrapper,
} from "./styled";

const Header = () => {
  const { push } = useHistory();
  const [showBlockView, setShowBlockView] = useState(
    loadStateFromStorage("blockview")
  );

  const handleClick = (e) => {
    const key = e.target.alt;
    const view = SaveViewState(key);
    push(`/home/${view}`);
    setShowBlockView(loadStateFromStorage("blockview"));
  };

  return (
    <AppBar className="appbar">
      <Toolbar>
        <TitleWrapper>
          <Typography>{textResources.MainHeader_App_Name}</Typography>
        </TitleWrapper>
        <IconsWrapper>
          <TreeviewWrapper>
            <img src={TreeviewIcon} alt="treeview" onClick={handleClick} />
          </TreeviewWrapper>
          <BlockviewWrapper>
            <img src={BlockviewIcon} alt="blockview" onClick={handleClick} />
          </BlockviewWrapper>
          <SwitchWrapper>
            {showBlockView ? (
              <img src={SwitchOnIcon} alt="switch" onClick={handleClick} />
            ) : (
              <img src={SwitchOffIcon} alt="switch" onClick={handleClick} />
            )}
          </SwitchWrapper>
        </IconsWrapper>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
