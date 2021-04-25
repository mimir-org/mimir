import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
    console.log("Save");
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
