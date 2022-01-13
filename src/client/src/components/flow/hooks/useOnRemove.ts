import { Elements, FlowElement, removeElements } from "react-flow-renderer";
import { Dispatch } from "redux";
import { Size } from "../../../compLibrary/size";
import { EDGE_KIND, Edge, Project } from "../../../models";
import { EDGE_TYPE, MODULE_TYPE } from "../../../models/project";
import { SetPanelHeight } from "../../../modules/inspector/helpers";
import { changeInspectorHeight } from "../../../modules/inspector/redux/inspectorSlice";
import { setModuleVisibility } from "../../../redux/store/modules/modulesSlice";
import { removeEdge, removeNode } from "../../../redux/store/project/actions";
import { HandleOffPageDelete } from "../block/nodes/helpers/offPage";
import { IsPartOf } from "../helpers";
import { GetSelectedBlockNode, GetSelectedNode, IsAspectNode, IsBlockView, IsOffPage } from "../../../helpers";

const useOnRemove = (
  elements: Elements,
  setElements: any,
  dispatch: Dispatch,
  inspectorRef: React.MutableRefObject<HTMLDivElement>,
  project: Project
) => {
  const elementsToRemove: Elements = [];
  elements = elements.filter((el) => !IsAspectNode(el.data));

  const hasDeletedElement = handleDeleteElements(elements, elementsToRemove, project, dispatch);

  if (hasDeletedElement) {
    dispatch(setModuleVisibility({type: MODULE_TYPE.INSPECTOR, visible: false, animate: true}));
    SetPanelHeight(inspectorRef, Size.ModuleClosed);
    dispatch(changeInspectorHeight(Size.ModuleClosed));
    return setElements((els) => removeElements(elementsToRemove, els));
  }
};

const handleDeleteElements = (elements: Elements, verifiedList: Elements, project: Project, dispatch: Dispatch) => {
  const selectedNode = GetSelectedNode();
  const selectedBlockNode = GetSelectedBlockNode();
  const blockView = IsBlockView();
  const edgeTypes = Object.values(EDGE_TYPE);
  let hasDeletedElement = false;

  for (const elem of elements) {
    const isEdge = isElementEdge(edgeTypes, elem);

    if (isEdge) {
      if (!IsAspectNode(blockView ? selectedBlockNode : selectedNode)) {
        if (findProjectEdgeByElementId(project, elem)?.isLocked) continue;
        hasDeletedElement = true;

        // Find OffPage nodes/edges related to the edge to be deleted
        handleRelatedOffPageElements(project, elem, dispatch);
        dispatch(removeEdge(elem.id));
        verifiedList.push(elem);
      }
    } else {
      const node = findProjectNodeByElementId(project, elem);
      if (node?.isLocked) continue;

      if (IsOffPage(node)) HandleOffPageDelete(project, node, dispatch);

      hasDeletedElement = true;
      dispatch(removeNode(elem.id));
      verifiedList.push(elem);
    }
  }

  return hasDeletedElement;
};

const isElementEdge = (edgeTypes: string[], element: FlowElement) => {
  return edgeTypes.some((x) => x === element.type?.toString() || element.data?.kind === EDGE_KIND);
};

const findProjectEdgeByElementId = (project: Project, element: FlowElement) => {
  return project.edges.find((edge) => edge.id === element.id);
};

const findProjectNodeByElementId = (project: Project, element: FlowElement) => {
  return project.nodes.find((node) => node.id === element.id);
};

const handleRelatedOffPageElements = (project: Project, element: FlowElement, dispatch: Dispatch) => {
  const edge = element?.data?.edge as Edge;
  project.nodes.forEach((node) => {
    if (IsOffPage(node) && (node?.id === edge?.fromNodeId || node?.id === edge?.toNodeId)) {
      const offPageTransportEdge = project.edges.find(
        (x) =>
          (IsOffPage(x?.fromNode) || IsOffPage(x?.toNode)) &&
          (x?.toConnectorId === edge?.toConnectorId || x?.fromConnectorId === edge?.fromConnectorId)
      );

      if (!offPageTransportEdge) return;

      const offPagePartOfTerminal = node?.connectors?.find((c) => IsPartOf(c));

      const offPagePartOfEdge = project.edges.find(
        (x) => IsOffPage(x?.toNode) && x?.toNodeId === node?.id && x?.toConnectorId === offPagePartOfTerminal?.id
      );

      if (offPagePartOfEdge) dispatch(removeEdge(offPagePartOfEdge.id));
      dispatch(removeEdge(offPageTransportEdge?.id));
      dispatch(removeNode(node?.id));
    }
  });
};

export default useOnRemove;
