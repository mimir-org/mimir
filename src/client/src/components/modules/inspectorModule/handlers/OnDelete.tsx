import { Size } from "../../../../compLibrary";
import { Edge, Node, Project } from "../../../../models";
import { MODULE_TYPE } from "../../../../models/project";
import { setModuleVisibility } from "../../../../redux/store/modules/actions";
import { SetPanelHeight } from "../helpers";
import {
  removeEdge,
  removeNode,
} from "../../../../redux/store/project/actions";

const OnDelete = (project: Project, node: Node, edge: Edge, dispatch: any) => {
  if (node) {
    project.edges.forEach((e) => {
      if (e.fromNodeId === node.id) dispatch(removeEdge(e.id));
      if (e.toNodeId === node.id) dispatch(removeEdge(e.id));
    });
    dispatch(removeNode(node.id));
  } else dispatch(removeEdge(edge.id));

  dispatch(setModuleVisibility(MODULE_TYPE.INSPECTOR, false, true));
  SetPanelHeight(Size.ModuleClosed);
};

export default OnDelete;
