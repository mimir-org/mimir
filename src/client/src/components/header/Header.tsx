import { useHistory } from "react-router-dom";
import { TextResources } from "../../assets/textResources";
import { useDispatch } from "react-redux";
import { VIEW_TYPE } from "../../models/project";
import { TreeviewOff, TreeviewOn } from "../../assets/icons/common";
import { ViewOffIcon, ViewOnIcon } from "../../assets/icons/blockView";
import { changeFlowView } from "../../redux/store/flow/actions";
import { IsBlockView } from "../flow/helpers/block";
import red from "../../redux/store";
import { SetDarkMode } from "../flow/helpers/common";
import {
  setSplitView,
  setSplitNode,
} from "../../redux/store/splitView/actions";
import {
  HeaderBox,
  IconBox,
  ProjectTitleBox,
  ViewLinkBox,
} from "../../componentLibrary/box/header/";

const Header = () => {
  const dispatch = useDispatch();
  const { push } = useHistory();

  const project = red.store.getState().projectState.project;
  const selectedNode = project?.nodes?.find((x) => x.isSelected);

  const handleClick = (e) => {
    if (e.target.alt === VIEW_TYPE.BLOCKVIEW && !selectedNode) return;
    const view = e.target.alt;
    dispatch(setSplitView(false));
    dispatch(setSplitNode(null));
    dispatch(changeFlowView(view));
    push(`/home/${view}`);
  };

  return (
    <HeaderBox>
      <ProjectTitleBox onClick={() => SetDarkMode()}>
        {TextResources.MainHeader_App_Name}
      </ProjectTitleBox>
      <IconBox>
        <ViewLinkBox selected={!IsBlockView()}>
          <img
            src={IsBlockView() ? TreeviewOff : TreeviewOn}
            alt={VIEW_TYPE.TREEVIEW}
            onClick={handleClick}
            className="view_icon"
          />
        </ViewLinkBox>
        <div className="line"></div>
        <ViewLinkBox selected={IsBlockView()} right>
          <img
            src={IsBlockView() ? ViewOnIcon : ViewOffIcon}
            alt={VIEW_TYPE.BLOCKVIEW}
            onClick={handleClick}
            className="view_icon"
          />
        </ViewLinkBox>
      </IconBox>
    </HeaderBox>
  );
};

export default Header;
