import { useHistory } from "react-router-dom";
import { TextResources } from "../../assets/textResources";
import { CheckView, SaveView } from "../../redux/store/localStorage";
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

  const isBlockView = CheckView(VIEW_TYPE.BLOCKVIEW);

  const handleClick = (e) => {
    dispatch(save(projectState.project));
    const view = e.target.alt;
    SaveView(view);
    setTimeout(() => {
      push(`/home/${view}`);
    }, 400);
  };

  return (
    <HeaderBox>
      <TitleBox>{TextResources.MainHeader_App_Name}</TitleBox>
      <IconBox>
        <ViewBox selected={!isBlockView}>
          <img
            src={isBlockView ? TreeviewOff : TreeviewOn}
            alt={VIEW_TYPE.TREEVIEW}
            onClick={handleClick}
            className="view_icon"
          />
        </ViewBox>
        <div className="line"></div>
        <ViewBox selected={isBlockView} right>
          <img
            src={isBlockView ? ViewOnIcon : ViewOffIcon}
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
