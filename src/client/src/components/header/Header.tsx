import { useState } from "react";
import { useHistory } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import textResources from "../../textResources";
import SaveViewState from "./helpers/SaveViewState";
import { LoadState } from "../../redux/store/localStorage/localStorage";
import {
  TreeviewOff,
  TreeviewOn,
  BlockviewOff,
  BlockviewOn,
} from "../../assets/index";
import {
  BlockviewWrapper,
  TreeviewWrapper,
  TitleWrapper,
  IconsWrapper,
} from "./styled";

const Header = () => {
  const { push } = useHistory();
  const [showBlockView, setShowBlockView] = useState(LoadState("blockview"));

  const handleClick = (e) => {
    const key = e.target.alt;
    const view = SaveViewState(key);
    push(`/home/${view}`);
    setShowBlockView(LoadState("blockview"));
  };

  return (
    <AppBar className="appbar">
      <Toolbar>
        <TitleWrapper>
          <Typography>{textResources.MainHeader_App_Name} </Typography>
        </TitleWrapper>
        <IconsWrapper>
          <TreeviewWrapper selected={!showBlockView}>
            {showBlockView ? (
              <img
                src={TreeviewOff}
                alt="treeview"
                onClick={handleClick}
                className="view_icon"
              />
            ) : (
              <img
                src={TreeviewOn}
                alt="treeview"
                onClick={handleClick}
                className="view_icon"
              />
            )}
          </TreeviewWrapper>
          <div className="line"></div>
          <BlockviewWrapper selected={showBlockView}>
            {showBlockView ? (
              <img
                src={BlockviewOn}
                alt="blockview"
                onClick={handleClick}
                className="view_icon"
              />
            ) : (
              <img
                src={BlockviewOff}
                alt="blockview"
                onClick={handleClick}
                className="view_icon"
              />
            )}
          </BlockviewWrapper>
        </IconsWrapper>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
