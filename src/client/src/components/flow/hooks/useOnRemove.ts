import { removeElements, FlowElement, Elements } from "react-flow-renderer";
import { Dispatch } from "redux";
import { Size } from "../../../compLibrary/size";
import { GetSelectedNode, IsAspectNode, IsBlockView, GetSelectedBlockNode, IsOffPage } from "../../../helpers";
import { Connector, Edge, EDGE_KIND, Node, Project } from "../../../models";
import { EDGE_TYPE, MODULE_TYPE } from "../../../models/project";
import { SetPanelHeight } from "../../../modules/inspector/helpers";
import { changeInspectorHeight } from "../../../modules/inspector/redux/height/actions";
import { setModuleVisibility } from "../../../redux/store/modules/actions";
import { removeEdge, removeNode, setOffPageStatus } from "../../../redux/store/project/actions";
import { GetParent, IsPartOf, IsTransport } from "../helpers";

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
    dispatch(setModuleVisibility(MODULE_TYPE.INSPECTOR, false, true));
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

  for (var elem of elements) {
    const isEdge = isElementEdge(edgeTypes, elem);

    if (isEdge) {
      if (!IsAspectNode(blockView ? selectedBlockNode : selectedNode)) {
        if (findProjectEdgeByElementId(project, elem)?.isLocked) continue;
        hasDeletedElement = true;
        dispatch(removeEdge(elem.id));
        verifiedList.push(elem);
      }
    } else {
      const node = findProjectNodeByElementId(project, elem);

      if (node?.isLocked) continue;

      if (IsOffPage(node)) handleOffPageDelete(node, project, dispatch);

      hasDeletedElement = true;
      dispatch(removeNode(elem.id));
      verifiedList.push(elem);
    }
  }

  return hasDeletedElement;
};

const handleOffPageDelete = (node: Node, project: Project, dispatch: Dispatch) => {
  const parentNode = GetParent(node);

  const offPageTransportEdge = getOffPageTransportEdge(node, parentNode, project);
  const offPagePartOfEdge = getOffPagePartOfEdge(node, parentNode, project);
  const parentNodeConnector = getParentNodeConnector(offPageTransportEdge, node);
  const offPageConnectedReferenceEdge = getOffPageConnectedReferenceEdge(parentNodeConnector, project);

  if (offPageTransportEdge && !offPageConnectedReferenceEdge) {
    // When deleting a Required OffPageNode, the parent's connector is reset to not required
    dispatch(setOffPageStatus(parentNode.id, parentNodeConnector.id, false));
  }

  if (offPageConnectedReferenceEdge) {
    handleConnectedOffPageDelete(project, offPageTransportEdge, offPageConnectedReferenceEdge, dispatch);
  }

  if (offPagePartOfEdge) dispatch(removeEdge(offPagePartOfEdge.id));
};

const handleConnectedOffPageDelete = (project: Project, transportEdge: Edge, referenceEdge: Edge, dispatch: Dispatch) => {
  // When deleting a Connected OffPageNode, the actual edge that the OffPageNode refers to is also deleted
  dispatch(removeEdge(referenceEdge.id));
  dispatch(removeEdge(transportEdge.id));

  // The opposite Connected OffPageNode and edges are also deleted
  const oppositeTransportEdge = project.edges.find(
    (x) =>
      (IsOffPage(x.fromNode) || IsOffPage(x.toNode)) &&
      (x.fromConnectorId === referenceEdge.fromConnectorId || x.toConnectorId === referenceEdge.toConnectorId)
  );

  const oppositeOffPageNode = IsOffPage(oppositeTransportEdge.toNode)
    ? oppositeTransportEdge.toNode
    : oppositeTransportEdge.fromNode;

  const oppositePartOfEdge = getOffPagePartOfEdge(oppositeOffPageNode, GetParent(oppositeOffPageNode), project);

  dispatch(removeNode(oppositeOffPageNode.id));
  dispatch(removeEdge(oppositeTransportEdge.id));
  dispatch(removeEdge(oppositePartOfEdge.id));
};

const getOffPageTransportEdge = (node: Node, parentNode: Node, project: Project) => {
  return project.edges.find(
    (x) =>
      (x.fromConnector?.nodeId === parentNode.id && IsTransport(x?.fromConnector) && x.toConnector?.nodeId === node.id) ||
      (x.toConnector?.nodeId === parentNode.id && IsTransport(x?.toConnector) && x.fromConnector?.nodeId === node.id)
  );
};

const getOffPagePartOfEdge = (node: Node, parentNode: Node, project: Project) => {
  return project.edges.find(
    (x) =>
      (x.fromConnector?.nodeId === parentNode.id && IsPartOf(x?.fromConnector) && x.toConnector?.nodeId === node.id) ||
      (x.toConnector?.nodeId === parentNode.id && IsPartOf(x?.toConnector) && x.fromConnector?.nodeId === node.id)
  );
};

const getOffPageConnectedReferenceEdge = (parentNodeConnector: Connector, project: Project) => {
  return project.edges.find(
    (edge) =>
      (edge.fromConnectorId === parentNodeConnector.id && !IsOffPage(edge.toNode)) ||
      (edge.toConnectorId === parentNodeConnector.id && !IsOffPage(edge.fromNode))
  );
};

const getParentNodeConnector = (offPageTransportEdge: Edge, node: Node) => {
  return offPageTransportEdge?.fromConnector?.nodeId === node.id
    ? offPageTransportEdge?.toConnector
    : offPageTransportEdge?.fromConnector;
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

export default useOnRemove;
