import * as Click from "./handlers";
import * as Icons from "../../assets/icons/header";
import { Location } from "../../assets/icons/aspects";
import { ViewType, VIEW_TYPE } from "../../models/project";
import { location3DSelector, useAppDispatch, useAppSelector } from "../../redux/store";
import { GetSelectedNode, IsBlockView, IsLocation } from "../../helpers";
import { OptionsBox, OptionsElement, ToolBarBox, LocationBox } from "./styled";

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
  const location3DActive = useAppSelector(location3DSelector);
  const selectedNode = GetSelectedNode();

  return (
    <ToolBarBox id="ToolBar" libOpen={libOpen} explorerOpen={explorerOpen}>
      <OptionsBox>
        <OptionsElement treeView={treeView} onClick={() => Click.OnView(VIEW_TYPE.TREEVIEW as ViewType, dispatch)}>
          <img src={treeView ? Icons.TreeViewActive : Icons.TreeView} alt={VIEW_TYPE.TREEVIEW} className="logo" />
        </OptionsElement>
        <OptionsElement treeView={treeView} onClick={() => Click.OnView(VIEW_TYPE.BLOCKVIEW as ViewType, dispatch)}>
          <img src={treeView ? Icons.BlockView : Icons.BlockViewActive} alt={VIEW_TYPE.BLOCKVIEW} className="logo" />
        </OptionsElement>
        {!treeView && (
          <OptionsElement treeView={treeView} onClick={() => Click.OnElectro(dispatch, electro)}>
            <img src={electro ? Icons.Vertical : Icons.Horizontal} alt="electro" className="logo" />
          </OptionsElement>
        )}
        <OptionsElement
          treeView={treeView}
          onClick={() => Click.OnFilter(dispatch, treeView ? treeFilter : blockFilter, treeView)}
        >
          <img src={Icons.Filter} alt="visual-filter" className="logo" />
        </OptionsElement>
      </OptionsBox>
      {IsBlockView() && IsLocation(selectedNode) && (
        <LocationBox onClick={() => Click.OnLocation3D(dispatch, location3DActive)} active={location3DActive}>
          <img src={Location} alt={"location3D"} className="logo" />
        </LocationBox>
      )}
    </ToolBarBox>
  );
};

export default ToolBar;
