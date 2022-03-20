import { Elements, FlowElement, removeElements } from "react-flow-renderer";
import { Dispatch } from "redux";
import { Size } from "../../../../compLibrary/size";
import { EDGE_KIND, Edge, Project } from "../../../../models";
import { EDGE_TYPE, MODULE_TYPE } from "../../../../models/project";
import { SetPanelHeight } from "../../../../modules/inspector/helpers";
import { changeInspectorHeight } from "../../../../modules/inspector/redux/inspectorSlice";
import { setModuleVisibility } from "../../../../redux/store/modules/modulesSlice";
import { removeEdge, removeNode, setOffPageStatus } from "../../../../redux/store/project/actions";
import { HandleOffPageDelete } from "../nodes/blockOffPageNode/helpers";
import { GetParent, IsPartOf } from "../../helpers";
import { GetSelectedBlockNode, IsAspectNode, IsOffPage } from "../../../../helpers";
import { GetParentNodeConnector } from "../nodes/blockOffPageNode/helpers/HandleOffPageDelete";
import { IsOffPageEdge } from "../helpers";

/**
 * Hook that runs when an element is deleted from Mimir in BlockView.
 * If a Node is deleted the connected Edges are also deleted.
 * If an Edge is deleted the connect Nodes will not be deleted, except an edge between OffPageNodes.
 * The removal of an Edge between OffPageNodes will also remove the connected Nodes.
 * @param elements
 * @param edgesToRemove
 * @param inspectorRef
 * @param project
 * @param setElements
 * @param dispatch
 */
const useOnRemove = (
  elements: Elements,
  edgesToRemove: Edge[],
  inspectorRef: React.MutableRefObject<HTMLDivElement>,
  project: Project,
  setElements: React.Dispatch<React.SetStateAction<Elements>>,
  dispatch: Dispatch
) => {
  const elementsToRemove: Elements = [];
  elements = elements.filter((el) => !IsAspectNode(el.data));

  const hasDeletedElement = handleDeleteElements(elements, elementsToRemove, project, dispatch);
  handleEdges(edgesToRemove, project, dispatch);

  if (hasDeletedElement) {
    dispatch(setModuleVisibility({ type: MODULE_TYPE.INSPECTOR, visible: false, animate: true }));
    SetPanelHeight(inspectorRef, Size.MODULE_CLOSED);
    dispatch(changeInspectorHeight(Size.MODULE_CLOSED));
    return setElements((els) => removeElements(elementsToRemove, els));
  }
};

const handleDeleteElements = (elements: Elements, elementsToRemove: Elements, project: Project, dispatch: Dispatch) => {
  const selectedNode = GetSelectedBlockNode();
  const edgeTypes = Object.values(EDGE_TYPE);
  let hasDeletedElement = false;

  for (const elem of elements) {
    const isEdge = isElementEdge(edgeTypes, elem);

    if (isEdge) {
      if (!IsAspectNode(selectedNode) && !findProjectEdgeByElementId(project, elem)?.isLocked) {
        hasDeletedElement = true;

        handleDeleteOffPageEdge(project, elem?.data?.edge, dispatch);
        dispatch(removeEdge(elem.id));
        elementsToRemove.push(elem);
      }
    } else {
      const node = findProjectNodeByElementId(project, elem);
      if (node?.isLocked) continue;
      if (IsOffPage(node)) HandleOffPageDelete(project, node, dispatch);

      hasDeletedElement = true;
      dispatch(removeNode(elem.id));
      elementsToRemove.push(elem);
    }
  }
  return hasDeletedElement;
};

const handleEdges = (edgesToRemove: Edge[], project: Project, dispatch: Dispatch) => {
  if (edgesToRemove.length !== 0) {
    edgesToRemove.forEach((edge) => {
      handleDeleteOffPageEdge(project, edge, dispatch);
      dispatch(removeEdge(edge.id));
    });
  }
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

const handleDeleteOffPageEdge = (project: Project, edge: Edge, dispatch: Dispatch) => {
  project.nodes.forEach((n) => {
    if (IsOffPage(n) && (n.id === edge.fromNodeId || n.id === edge.toNodeId)) {
      const transportEdge = project.edges.find(
        (e) => IsOffPageEdge(e) && (e?.toConnectorId === edge?.toConnectorId || e?.fromConnectorId === edge?.fromConnectorId)
      );

      if (!transportEdge) return;

      const partOfTerminal = n?.connectors?.find((c) => IsPartOf(c));
      const partOfEdge = project.edges.find(
        (x) => IsOffPage(x.toNode) && x.toNodeId === n.id && x.toConnectorId === partOfTerminal?.id
      );

      const parentNode = GetParent(n);
      const parentNodeConnector = GetParentNodeConnector(transportEdge, n);
      const parentConnectorIsRequired = false;

      dispatch(setOffPageStatus(parentNode?.id, parentNodeConnector?.id, parentConnectorIsRequired));
      dispatch(removeEdge(transportEdge?.id));
      dispatch(removeEdge(partOfEdge?.id));
      dispatch(removeNode(n.id));
    }
  });
};

export default useOnRemove;
