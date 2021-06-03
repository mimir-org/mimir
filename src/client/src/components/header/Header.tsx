import { useHistory } from "react-router-dom";
import { TextResources } from "../../assets/textResources";
import { SetView } from "../../redux/store/localStorage";
import { useDispatch } from "react-redux";
import { VIEW_TYPE } from "../../models/project";
import { TreeviewOff, TreeviewOn } from "../../assets/icons";
import { ViewOffIcon, ViewOnIcon } from "../../assets/icons/blockView";
import { changeFlowView } from "../../redux/store/flow/actions";
import { IsBlockView } from "../flow/helpers/block";
import store from "../../redux/store";
import {
  HeaderBox,
  IconBox,
  TitleBox,
  ViewBox,
} from "../../componentLibrary/box/header/";

const Header = () => {
  const dispatch = useDispatch();
  const { push } = useHistory();

  const project = store.getState().projectState.project;
  const selectedNode = project?.nodes?.find((x) => x.isSelected);

  const handleClick = (e) => {
    if (e.target.alt === VIEW_TYPE.BLOCKVIEW && !selectedNode) return;
    const view = e.target.alt;
    dispatch(changeFlowView(view));
    SetView(view);
    push(`/home/${view}`);
  };

  return (
    <HeaderBox>
      <TitleBox>{TextResources.MainHeader_App_Name}</TitleBox>
      <IconBox>
        <ViewBox selected={!IsBlockView()}>
          <img
            src={IsBlockView() ? TreeviewOff : TreeviewOn}
            alt={VIEW_TYPE.TREEVIEW}
            onClick={handleClick}
            className="view_icon"
          />
        </ViewBox>
        <div className="line"></div>
        <ViewBox selected={IsBlockView()} right>
          <img
            src={IsBlockView() ? ViewOnIcon : ViewOffIcon}
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
