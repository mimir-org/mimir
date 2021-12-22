import { removeElements, FlowElement, Elements } from "react-flow-renderer";
import { Dispatch } from "redux";
import { Size } from "../../../compLibrary/size";
import { GetSelectedNode, IsAspectNode, IsBlockView, GetSelectedBlockNode, IsOffPage } from "../../../helpers";
import { EDGE_KIND, Node, Project } from "../../../models";
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

  const offPageTransportEdge = project.edges.find(
    (x) =>
      (x.fromConnector?.nodeId === parentNode.id && IsTransport(x?.fromConnector) && x.toConnector?.nodeId === node.id) ||
      (x.toConnector?.nodeId === parentNode.id && IsTransport(x?.toConnector) && x.fromConnector?.nodeId === node.id)
  );

  const offPagepartOfEdge = project.edges.find(
    (x) =>
      (x.fromConnector?.nodeId === parentNode.id && IsPartOf(x?.fromConnector) && x.toConnector?.nodeId === node.id) ||
      (x.toConnector?.nodeId === parentNode.id && IsPartOf(x?.toConnector) && x.fromConnector?.nodeId === node.id)
  );

  const parentNodeConnector =
    offPageTransportEdge?.fromConnector?.nodeId === node.id
      ? offPageTransportEdge?.toConnector
      : offPageTransportEdge?.fromConnector;

  const connectedEdge = project.edges.find((edge) => edge.fromConnectorId === parentNodeConnector.id && !IsOffPage(edge.toNode));

  if (offPageTransportEdge && !connectedEdge) {
    // When deleting a Required OffPageNode, the parent's connector is reset to not required
    dispatch(setOffPageStatus(parentNode.id, parentNodeConnector.id, false));
  }

  if (connectedEdge) {
    // When deleting a Connected OffPageNode, the actual edge that the OffPageNode refers to is also deleted
    dispatch(removeEdge(connectedEdge.id));
    dispatch(removeEdge(offPageTransportEdge.id));
  }

  if (offPagepartOfEdge) dispatch(removeEdge(offPagepartOfEdge.id));
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
