import * as Click from "./handlers";
import * as Icons from "../../assets/icons/header";
import { Location } from "../../assets/icons/aspects";
import { ViewType, VIEW_TYPE } from "../../models/project";
import { location3DSelector, useAppDispatch, useAppSelector } from "../../redux/store";
import { GetSelectedNode, IsBlockView, IsLocation } from "../../helpers";
import { OptionsBox, ToolBarBox, LocationBox } from "./styled";
import { ToolBarElement } from ".";

interface Props {
  libOpen: boolean;
  explorerOpen: boolean;
  treeView: boolean;
  visualFilter: boolean;
  electro: boolean;
}

/**
 * Component for the ToolBar - the menu bar at the top of Mimir.
 * @param interface
 * @returns a menu with icons for different features.
 */
const ToolBar = ({ libOpen, explorerOpen, treeView, visualFilter, electro }: Props) => {
  const dispatch = useAppDispatch();
  const location3DActive = useAppSelector(location3DSelector);
  const selectedNode = GetSelectedNode();

  return (
    <ToolBarBox id="ToolBar" libOpen={libOpen} explorerOpen={explorerOpen}>
      <OptionsBox>
        <ToolBarElement
          treeView={treeView}
          label={VIEW_TYPE.TREEVIEW}
          icon={treeView ? Icons.TreeViewActive : Icons.TreeView}
          onClick={() => Click.OnView(VIEW_TYPE.TREEVIEW as ViewType, dispatch)}
        />
        <ToolBarElement
          treeView={treeView}
          label={VIEW_TYPE.BLOCKVIEW}
          icon={treeView ? Icons.BlockView : Icons.BlockViewActive}
          onClick={() => Click.OnView(VIEW_TYPE.BLOCKVIEW as ViewType, dispatch)}
        />
        {!treeView && (
          <ToolBarElement
            treeView={treeView}
            label={"electro"}
            icon={electro ? Icons.Vertical : Icons.Horizontal}
            onClick={() => Click.OnElectro(dispatch, electro)}
          />
        )}
        <ToolBarElement
          treeView={treeView}
          label={"visual-filter"}
          icon={Icons.Filter}
          onClick={() => Click.OnFilter(dispatch, visualFilter)}
        />
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
