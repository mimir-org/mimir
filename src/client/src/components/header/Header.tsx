import { useState } from "react";
import { useHistory } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import textResources from "../../textResources";
import SaveViewState from "./helpers/SaveViewState";
import { loadStateFromStorage } from "../../redux/store/localStorage/LocalStorage";
import {
  TreeviewIcon,
  BlockviewIcon,
  VisualFilterIcon,
  SwitchOnIcon,
  SwitchOffIcon,
} from "../../assets/index";
import {
  TextWrapper,
  BlockviewWrapper,
  TreeviewWrapper,
  VisualIconWrapper,
  TitleWrapper,
  IconsWrapper,
  SwitchWrapper,
} from "./styled";

const Header = () => {
  const { push } = useHistory();
  const [showDiagram, setShowDiagram] = useState(
    loadStateFromStorage("diagram")
  );

  const handleClick = (e) => {
    const key = e.target.alt;
    const view = SaveViewState(key);
    push(`/home/${view}`);
    setShowDiagram(loadStateFromStorage("diagram"));
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
            <img src={BlockviewIcon} alt="diagram" onClick={handleClick} />
          </BlockviewWrapper>
          <SwitchWrapper>
            {showDiagram ? (
              <img src={SwitchOnIcon} alt="switch" onClick={handleClick} />
            ) : (
              <img src={SwitchOffIcon} alt="switch" onClick={handleClick} />
            )}
          </SwitchWrapper>
        </IconsWrapper>

        <VisualIconWrapper>
          <img src={VisualFilterIcon} alt="visualfilter" onClick={() => null} />
        </VisualIconWrapper>
        <TextWrapper>
          <Typography>{textResources.MainHeader_VisualFilter}</Typography>
        </TextWrapper>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
