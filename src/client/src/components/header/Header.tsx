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
import HeaderBox from "../../componentLibrary/box/header/HeaderBox";
import IconBox from "../../componentLibrary/box/header/IconBox";
import {
  TreeviewOff,
  TreeviewOn,
  BlockviewOn,
  BlockviewOff,
} from "../../assets/icons";
import { TreeviewWrapper, TitleWrapper } from "./styled";

const Header = () => {
  const dispatch = useDispatch();
  const { push } = useHistory();

  const projectState = useSelector<RootState>(
    (state) => state.projectState
  ) as ProjectState;

  const key = VIEW_TYPE.BLOCKVIEW;
  const [showBlockView, setShowBlockView] = useState(LoadState(key));

  const handleClick = (e) => {
    const view = e.target.alt;
    SaveViewState(view);

    if (view === key) {
      dispatch(save(projectState.project));
      setShowBlockView(LoadState(key));
      setTimeout(() => {
        push(`/home/${view}`);
      }, 900); // TODO fix
      return;
    }
    setShowBlockView(LoadState(key));
    push(`/home/${view}`);
  };

  return (
    <HeaderBox>
      <TitleWrapper>{TextResources.MainHeader_App_Name}</TitleWrapper>
      <IconBox>
        <TreeviewWrapper selected={!showBlockView}>
          <img
            src={showBlockView ? TreeviewOff : TreeviewOn}
            alt={VIEW_TYPE.TREEVIEW}
            onClick={handleClick}
            className="view_icon"
          />
        </TreeviewWrapper>
        <div className="line"></div>
        <TreeviewWrapper selected={showBlockView}>
          <img
            src={showBlockView ? BlockviewOn : BlockviewOff}
            alt={VIEW_TYPE.BLOCKVIEW}
            onClick={handleClick}
            className="view_icon"
          />
        </TreeviewWrapper>
      </IconBox>
    </HeaderBox>
  );
};

export default Header;
