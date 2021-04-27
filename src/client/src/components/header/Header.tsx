import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import textResources from "../../textResources";
import SaveViewState from "./helpers/SaveViewState";
import { loadStateFromStorage } from "../../redux/store/localStorage/localStorage";
import {
  TreeviewOn,
  TreeviewOff,
  BlockviewOn,
  BlockviewOff,
} from "../../assets/index";
import {
  BlockviewWrapper,
  TreeviewWrapper,
  TitleWrapper,
  IconsWrapper,
  SwitchWrapper,
} from "./styled";

import { RootState } from "../../redux/store/index";
import { Project } from "../../models/project";
import { save } from "../../redux/store/project/actions";

const Header = () => {
  const { push } = useHistory();
  const [showBlockView, setShowBlockView] = useState(
    loadStateFromStorage("blockview")
  );
  const dispatch = useDispatch();
  const project = useSelector<RootState>(
    (state) => state.projectState.project
  ) as Project;

  const handleClick = (e) => {
    const key = e.target.alt;
    const view = SaveViewState(key);
    push(`/home/${view}`);
    setShowBlockView(loadStateFromStorage("blockview"));
  };

  const handleSave = () => {
    if (project) dispatch(save(project));
  };

  return (
    <AppBar className="appbar">
      <Toolbar>
        <TitleWrapper>
          <Typography>
            {textResources.MainHeader_App_Name}{" "}
            <span
              onClick={handleSave}
              style={{ background: "black", padding: "2px" }}
            >
              SAVE
            </span>
          </Typography>
        </TitleWrapper>
        <IconsWrapper>
          <TreeviewWrapper on={!showBlockView}>
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
          <BlockviewWrapper on={showBlockView}>
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
