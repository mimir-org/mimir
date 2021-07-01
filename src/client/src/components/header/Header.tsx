import { RootState } from "../../redux/store";
import { useHistory } from "react-router-dom";
import { TextResources } from "../../assets/textResources";
import { useDispatch, useSelector } from "react-redux";
import { VIEW_TYPE } from "../../models/project";
import { changeFlowView } from "../../redux/store/flow/actions";
import { setDarkMode } from "../../redux/store/darkMode/actions";
import { FindSelectedNode, SetDarkModeColor } from "../flow/helpers/common";
import { IsBlockView } from "../flow/helpers/block";
import {
  HeaderBox,
  OptionsBox,
  TitleBox,
  OptionsElement,
} from "../../compLibrary/box/header/";
import {
  DarkModeOffIcon,
  DarkModeOnIcon,
  TreeViewOffIcon,
  TreeViewOnIcon,
  UndoIcon,
} from "../../assets/icons/common";

const Header = () => {
  const dispatch = useDispatch();
  const { push } = useHistory();
  const selectedNode = FindSelectedNode();
  const darkMode = useSelector<RootState>(
    (state) => state.darkMode.active
  ) as boolean;

  const onViewClick = (e) => {
    if (e.target.alt === VIEW_TYPE.BLOCKVIEW && !selectedNode) return;
    const view = e.target.alt;
    dispatch(changeFlowView(view));
    push(`/home/${view}`);
  };

  const onDarkMode = () => {
    dispatch(setDarkMode(!darkMode));
    SetDarkModeColor(!darkMode);
  };

  const onUndo = () => {
    return null;
  };

  return (
    <HeaderBox>
      <TitleBox>{TextResources.MainHeader_App_Name} </TitleBox>
      <OptionsBox>
        <OptionsElement>
          <img
            src={darkMode ? DarkModeOnIcon : DarkModeOffIcon}
            alt="dark-mode"
            onClick={onDarkMode}
          />
        </OptionsElement>
        <OptionsElement>
          <img src={UndoIcon} alt="undo" onClick={onUndo} />
        </OptionsElement>
        <OptionsElement>
          <img
            src={IsBlockView() ? TreeViewOffIcon : TreeViewOnIcon}
            alt={IsBlockView() ? VIEW_TYPE.TREEVIEW : VIEW_TYPE.BLOCKVIEW}
            onClick={onViewClick}
          />
        </OptionsElement>
      </OptionsBox>
    </HeaderBox>
  );
};

export default Header;
