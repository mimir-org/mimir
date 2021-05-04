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

  const key = "blockview";
  const [showBlockView, setShowBlockView] = useState(LoadState(key));

  const handleClick = (e) => {
    const view = e.target.alt;
    SaveViewState(view);

    if (view === key) {
      dispatch(save(projectState.project));
      setShowBlockView(LoadState(key));
      setTimeout(() => {
        push(`/home/${view}`);
      }, 900);
      return;
    }
    setShowBlockView(LoadState(key));
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
            <img
              src={showBlockView ? TreeviewOff : TreeviewOn}
              alt="treeview"
              onClick={handleClick}
              className="view_icon"
            />
          </TreeviewWrapper>
          <div className="line"></div>
          <BlockviewWrapper selected={showBlockView}>
            <img
              src={showBlockView ? BlockviewOn : BlockviewOff}
              alt="blockview"
              onClick={handleClick}
              className="view_icon"
            />
          </BlockviewWrapper>
        </IconsWrapper>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
