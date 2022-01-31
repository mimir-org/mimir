import { Size } from "../../../compLibrary/size";
import { Edge, Node, Project } from "../../../models";
import { MODULE_TYPE } from "../../../models/project";
import { setModuleVisibility } from "../../../redux/store/modules/modulesSlice";
import { SetPanelHeight } from "../helpers";
import { removeEdge, removeNode } from "../../../redux/store/project/actions";
import { changeInspectorHeight } from "../redux/inspectorSlice";
import { InspectorElement } from "../types";
import { IsEdge, IsNode } from "../helpers/IsType";
import { Dispatch } from "redux";
import { IsAspectNode } from "../../../helpers";
import { IsPartOf, UpdateSiblingIndexOnEdgeDelete, UpdateSiblingIndexOnNodeDelete } from "../../../components/flow/helpers";

const OnDeleteClick = (
  project: Project,
  element: InspectorElement,
  dispatch: Dispatch,
  inspectorRef: React.MutableRefObject<HTMLDivElement>
) => {
  if (IsNode(element)) {
    HandleNodeDelete(element, project, dispatch);
  } else if (IsEdge(element)) {
    HandleEdgeDelete(element, project, dispatch);
  }

  dispatch(setModuleVisibility({ type: MODULE_TYPE.INSPECTOR, visible: false, animate: true }));
  dispatch(changeInspectorHeight(Size.ModuleClosed));
  SetPanelHeight(inspectorRef, Size.ModuleClosed);
};

const HandleNodeDelete = (node: Node, project: Project, dispatch: Dispatch) => {
  if (IsAspectNode(node)) return;

  project.edges.forEach((e) => {
    if (e.fromNodeId === node.id) dispatch(removeEdge(e.id));
    if (e.toNodeId === node.id) dispatch(removeEdge(e.id));
  });

  UpdateSiblingIndexOnNodeDelete(node, project, dispatch);
  dispatch(removeNode(node.id));
};

const HandleEdgeDelete = (edge: Edge, project: Project, dispatch: Dispatch) => {
  if (IsPartOf(edge.fromConnector)) UpdateSiblingIndexOnEdgeDelete(edge, project, dispatch);
  dispatch(removeEdge(edge.id));
};

export default OnDeleteClick;
