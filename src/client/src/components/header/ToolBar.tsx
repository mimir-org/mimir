import * as Click from "./handlers";
import * as Icons from "../../assets/icons/header";
import { useHistory } from "react-router-dom";
import { ViewType, VIEW_TYPE } from "../../models/project";
import { OptionsBox, OptionsElement, ToolBarBox } from "../../compLibrary/box/header/";
import { useAppDispatch } from "../../redux/store";

interface Props {
  libOpen: boolean;
  explorerOpen: boolean;
  treeView: boolean;
  filterMenuOpen: boolean;
  filterMenuBlockOpen: boolean;
  electro: boolean;
}

/**
 * Component for the ToolBar - the menu bar at the top of Mimir.
 * @param dispatch
 * @param libOpen
 * @param explorerOpen
 * @param treeView
 * @returns a menu with icons for different features.
 */
const ToolBar = ({ libOpen, explorerOpen, treeView, filterMenuOpen, filterMenuBlockOpen, electro }: Props) => {
  const dispatch = useAppDispatch();
  const { push } = useHistory();

  return (
    <ToolBarBox id="ToolBar" libOpen={libOpen} explorerOpen={explorerOpen}>
      <OptionsBox>
        <OptionsElement
          treeView={treeView}
          onClick={() => Click.OnFilter(dispatch, treeView ? filterMenuOpen : filterMenuBlockOpen, treeView)}
        >
          <img src={Icons.Filter} alt="visual-filter" />
        </OptionsElement>
        {!treeView && (
          <OptionsElement treeView={treeView} onClick={() => Click.OnElectro(dispatch, electro)}>
            <img src={electro ? Icons.Vertical : Icons.Horizontal} alt="electro" />
          </OptionsElement>
        )}
        <OptionsElement
          treeView={treeView}
          onClick={() => Click.OnView(VIEW_TYPE.BLOCKVIEW as ViewType, dispatch, push)}
        >
          <img src={treeView ? Icons.BlockView : Icons.BlockViewActive} alt={VIEW_TYPE.BLOCKVIEW} />
        </OptionsElement>
        <OptionsElement treeView={treeView} onClick={() => Click.OnView(VIEW_TYPE.TREEVIEW as ViewType, dispatch, push)}>
          <img src={treeView ? Icons.TreeViewActive : Icons.TreeView} alt={VIEW_TYPE.TREEVIEW} />
        </OptionsElement>
      </OptionsBox>
    </ToolBarBox>
  );
};

export default ToolBar;
