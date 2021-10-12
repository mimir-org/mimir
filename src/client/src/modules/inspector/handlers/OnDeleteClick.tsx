import { Size } from "../../../compLibrary";
import { Edge, Node, Project } from "../../../models";
import { MODULE_TYPE } from "../../../models/project";
import { setModuleVisibility } from "../../../redux/store/modules/actions";
import { SetPanelHeight } from "../helpers";
import { removeEdge, removeNode } from "../../../redux/store/project/actions";
import { changeInspectorHeight } from "../redux/height/actions";
import { IsPartOfTerminal } from "../../../components/flow/helpers";
import { UpdateSiblingIndexOnEdgeDelete, UpdateSiblingIndexOnNodeDelete } from "../../../components/flow/helpers";

const OnDeleteClick = (project: Project, node: Node, edge: Edge, dispatch: any) => {
  if (node) {
    project.edges.forEach((e) => {
      if (e.fromNodeId === node.id) dispatch(removeEdge(e.id));
      if (e.toNodeId === node.id) dispatch(removeEdge(e.id));
    });

    UpdateSiblingIndexOnNodeDelete(node, project, dispatch);

    dispatch(removeNode(node.id));
  } else {
    if (IsPartOfTerminal(edge.fromConnector)) {
      UpdateSiblingIndexOnEdgeDelete(edge, project, dispatch);
    }

    dispatch(removeEdge(edge.id));
  }

  dispatch(setModuleVisibility(MODULE_TYPE.INSPECTOR, false, true));
  dispatch(changeInspectorHeight(Size.ModuleClosed));
  SetPanelHeight(Size.ModuleClosed);
};

export default OnDeleteClick;
