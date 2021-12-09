import * as Click from "./handlers";
import * as Icons from "../../assets/icons/header";
import { Dispatch } from "redux";
import { ViewType, VIEW_TYPE } from "../../models/project";
import { ToolBarBody, ToolBarBox } from "./styled";
import { ToolBarElement } from ".";
import { Node, Project } from "../../models";

interface Props {
  project: Project;
  libOpen: boolean;
  explorerOpen: boolean;
  treeView: boolean;
  visualFilter: boolean;
  electro: boolean;
  location3DActive: boolean;
  selectedNode: Node;
  dispatch: Dispatch;
}

/**
 * The ToolBar - the menu below the HeaderMenu at the top of Mimir.
 * @param interface
 * @returns a menu with icons for different features.
 */
const ToolBarComponent = ({
  project,
  libOpen,
  explorerOpen,
  treeView,
  visualFilter,
  electro,
  location3DActive,
  selectedNode,
  dispatch,
}: Props) => (
  <ToolBarBox id="ToolBar" libOpen={libOpen} explorerOpen={explorerOpen}>
    <ToolBarBody>
      <ToolBarElement
        treeView={treeView}
        label={VIEW_TYPE.TREEVIEW}
        icon={treeView ? Icons.TreeViewActive : Icons.TreeView}
        onClick={() => Click.OnView(project, VIEW_TYPE.TREEVIEW as ViewType, dispatch)}
      />
      <ToolBarElement
        treeView={treeView}
        label={VIEW_TYPE.BLOCKVIEW}
        icon={treeView ? Icons.BlockView : Icons.BlockViewActive}
        onClick={() => Click.OnView(project, VIEW_TYPE.BLOCKVIEW as ViewType, dispatch)}
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
    </ToolBarBody>

    {/* {IsBlockView() && IsLocation(selectedNode) && (
      <LocationBox onClick={() => Click.OnLocation3D(dispatch, location3DActive)} active={location3DActive}>
        <img src={Location} alt={"location3D"} className="logo" />
      </LocationBox>
    )} */}
  </ToolBarBox>
);

export default ToolBarComponent;
