import { useHistory } from "react-router-dom";
import { TextResources } from "../../assets/textResources";
import { CheckView, SetView } from "../../redux/store/localStorage";
import { useDispatch } from "react-redux";
import { VIEW_TYPE } from "../../models/project";
import { TreeviewOff, TreeviewOn } from "../../assets/icons";
import { ViewOffIcon, ViewOnIcon } from "../../assets/icons/blockView";
import { changeFlowView } from "../../redux/store/flow/actions";
import {
  HeaderBox,
  IconBox,
  TitleBox,
  ViewBox,
} from "../../componentLibrary/box/header/";

const Header = () => {
  const dispatch = useDispatch();
  const { push } = useHistory();
  const isBlockView = CheckView(VIEW_TYPE.BLOCKVIEW);

  const handleClick = (e) => {
    const view = e.target.alt;
    dispatch(changeFlowView(view));
    SetView(view);
    push(`/home/${view}`);
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
