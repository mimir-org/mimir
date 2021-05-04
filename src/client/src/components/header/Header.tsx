import { useState } from "react";
import { useHistory } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import textResources from "../../textResources";
import SaveViewState from "./helpers/SaveViewState";
import { LoadState } from "../../redux/store/localStorage/localStorage";
import { useDispatch, useSelector } from "react-redux";
import { save } from "../../redux/store/project/actions";
import { RootState } from "../../redux/store";
import { ProjectState } from "../../redux/store/project/types";
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
  const dispatch = useDispatch();
  const { push } = useHistory();
  const projectState = useSelector<RootState>(
    (state) => state.projectState
  ) as ProjectState;
  const [showBlockView, setShowBlockView] = useState(LoadState("blockview"));

  const handleClick = (e) => {
    const key = e.target.alt;
    const view = SaveViewState(key);

    if (view === "blockview") {
      dispatch(save(projectState.project));
      setTimeout(() => {
        setShowBlockView(LoadState("blockview"));
        push(`/home/${view}`);
      }, 900);
      return;
    }
    setShowBlockView(LoadState("blockview"));
    push(`/home/${view}`);
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
