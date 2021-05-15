import { useState } from "react";
import { useHistory } from "react-router-dom";
import { TextResources } from "../../assets/textResources";
import SaveViewState from "./helpers/SaveViewState";
import { LoadState } from "../../redux/store/localStorage/localStorage";
import { useDispatch, useSelector } from "react-redux";
import { save } from "../../redux/store/project/actions";
import { RootState } from "../../redux/store";
import { ProjectState } from "../../redux/store/project/types";
import { VIEW_TYPE } from "../../models/project";
import { TreeviewOff, TreeviewOn } from "../../assets/icons";
import { ViewOffIcon, ViewOnIcon } from "../../assets/icons/blockView";
import {
  HeaderBox,
  IconBox,
  TitleBox,
  ViewBox,
} from "../../componentLibrary/box/header/";

const Header = () => {
  const dispatch = useDispatch();
  const { push } = useHistory();

  const projectState = useSelector<RootState>(
    (state) => state.projectState
  ) as ProjectState;

  const key = VIEW_TYPE.BLOCKVIEW;
  const [showBlockView, setShowBlockView] = useState(LoadState(key));

  const handleClick = (e) => {
    dispatch(save(projectState.project));
    const view = e.target.alt;
    SaveViewState(view);
    setShowBlockView(LoadState(key));
    setTimeout(() => {
      push(`/home/${view}`);
    }, 400);
  };

  return (
    <HeaderBox>
      <TitleBox>{TextResources.MainHeader_App_Name}</TitleBox>
      <IconBox>
        <ViewBox selected={!showBlockView}>
          <img
            src={showBlockView ? TreeviewOff : TreeviewOn}
            alt={VIEW_TYPE.TREEVIEW}
            onClick={handleClick}
            className="view_icon"
          />
        </ViewBox>
        <div className="line"></div>
        <ViewBox selected={showBlockView} right>
          <img
            src={showBlockView ? ViewOnIcon : ViewOffIcon}
            alt={VIEW_TYPE.BLOCKVIEW}
            onClick={handleClick}
            className="view_icon"
          />
        </ViewBox>
      </IconBox>
    </HeaderBox>
  );
};

export default Header;
