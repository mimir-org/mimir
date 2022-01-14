import * as Click from "./handlers";
import * as Icons from "../../assets/icons/header";
import { Dispatch } from "redux";
import { VIEW_TYPE, ViewType } from "../../models/project";
import { ToolBarBody, ToolBarBox } from "./styled";
import { ToolBarElement } from ".";
import { Node, Project } from "../../models";

interface Props {
  project: Project;
  libOpen: boolean;
  explorerOpen: boolean;
  isTreeView: boolean;
  visualFilterOpen: boolean;
  isElectro: boolean;
  location3DActive: boolean;
  selectedNode: Node;
  dispatch: Dispatch;
}

/**
 * The ToolBar - the menu below the HeaderMenu at the top of Mimir.
 * @param interface
 * @returns a menu with icons for different features.
 */
const ToolBarComponent = ({ project, libOpen, explorerOpen, isTreeView, visualFilterOpen, isElectro, dispatch }: Props) => (
  <ToolBarBox id="ToolBar" libOpen={libOpen} explorerOpen={explorerOpen}>
    <ToolBarBody>
      <ToolBarElement
        active={isTreeView}
        label={VIEW_TYPE.TREEVIEW}
        icon={isTreeView ? Icons.TreeViewActive : Icons.TreeView}
        onClick={() => Click.OnView(project, VIEW_TYPE.TREEVIEW as ViewType, dispatch)}
      />
      <ToolBarElement
        active={isTreeView}
        label={VIEW_TYPE.BLOCKVIEW}
        icon={isTreeView ? Icons.BlockView : Icons.BlockViewActive}
        onClick={() => Click.OnView(project, VIEW_TYPE.BLOCKVIEW as ViewType, dispatch)}
      />
      {!isTreeView && (
        <ToolBarElement
          label={"electro"}
          icon={isElectro ? Icons.Vertical : Icons.Horizontal}
          onClick={() => Click.OnElectro(dispatch)}
        />
      )}
      <ToolBarElement
        active={visualFilterOpen}
        label={"visual-filter"}
        icon={visualFilterOpen ? Icons.FilterActive : Icons.Filter}
        onClick={() => Click.OnFilter(dispatch, visualFilterOpen)}
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
