import * as Click from "./handlers";
import * as Icons from "../../assets/icons/header";
import { ViewType, VIEW_TYPE } from "../../models/project";
import { OptionsBox, OptionsElement, ToolBarBox } from "../../compLibrary/box/header/";
import { useAppDispatch } from "../../redux/store";

interface Props {
  libOpen: boolean;
  explorerOpen: boolean;
  treeView: boolean;
  treeFilter: boolean;
  blockFilter: boolean;
  electro: boolean;
}

/**
 * Component for the ToolBar - the menu bar at the top of Mimir.
 * @param interface
 * @returns a menu with icons for different features.
 */
const ToolBar = ({ libOpen, explorerOpen, treeView, treeFilter, blockFilter, electro }: Props) => {
  const dispatch = useAppDispatch();

  return (
    <ToolBarBox id="ToolBar" libOpen={libOpen} explorerOpen={explorerOpen}>
      <OptionsBox>
        <OptionsElement
          treeView={treeView}
          onClick={() => Click.OnFilter(dispatch, treeView ? treeFilter : blockFilter, treeView)}
        >
          <img src={Icons.Filter} alt="visual-filter" />
        </OptionsElement>
        {!treeView && (
          <OptionsElement treeView={treeView} onClick={() => Click.OnElectro(dispatch, electro)}>
            <img src={electro ? Icons.Vertical : Icons.Horizontal} alt="electro" />
          </OptionsElement>
        )}
        <OptionsElement treeView={treeView} onClick={() => Click.OnView(VIEW_TYPE.BLOCKVIEW as ViewType, dispatch)}>
          <img src={treeView ? Icons.BlockView : Icons.BlockViewActive} alt={VIEW_TYPE.BLOCKVIEW} />
        </OptionsElement>

        <OptionsElement treeView={treeView} onClick={() => Click.OnView(VIEW_TYPE.TREEVIEW as ViewType, dispatch)}>
          <img src={treeView ? Icons.TreeViewActive : Icons.TreeView} alt={VIEW_TYPE.TREEVIEW} />
        </OptionsElement>
      </OptionsBox>
    </ToolBarBox>
  );
};

export default ToolBar;
