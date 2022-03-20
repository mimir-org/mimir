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
import { GetParentConnector } from "../nodes/blockOffPageNode/helpers/HandleOffPageDelete";
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

  FindElementsToRemove(elements, elementsToRemove, project, dispatch);
  HandleEdges(edgesToRemove, project, dispatch);

  if (elementsToRemove.length) {
    CloseInspector(inspectorRef, dispatch);
    return setElements((els) => removeElements(elementsToRemove, els));
  }
};

function FindElementsToRemove(elements: Elements, elementsToRemove: Elements, project: Project, dispatch: Dispatch) {
  const selectedNode = GetSelectedBlockNode();
  const edgeTypes = Object.values(EDGE_TYPE);

  for (const elem of elements) {
    const isEdge = IsElementEdge(edgeTypes, elem);

    if (isEdge) {
      if (!IsAspectNode(selectedNode) && !FindProjectEdgeByElementId(project, elem)?.isLocked) {
        HandleDeleteOffPageEdge(project, elem?.data?.edge, dispatch);
        dispatch(removeEdge(elem.id));
        elementsToRemove.push(elem);
      }
    } else {
      const node = FindProjectNodeByElementId(project, elem);
      if (node?.isLocked) continue;
      if (IsOffPage(node)) HandleOffPageDelete(project, node, dispatch);

      dispatch(removeNode(elem.id));
      elementsToRemove.push(elem);
    }
  }
}

function HandleEdges(edgesToRemove: Edge[], project: Project, dispatch: Dispatch) {
  if (edgesToRemove.length) {
    edgesToRemove.forEach((edge) => {
      HandleDeleteOffPageEdge(project, edge, dispatch);
      dispatch(removeEdge(edge.id));
    });
  }
}

function IsElementEdge(edgeTypes: string[], element: FlowElement) {
  return edgeTypes.some((x) => x === element.type?.toString() || element.data?.kind === EDGE_KIND);
}

function FindProjectEdgeByElementId(project: Project, element: FlowElement) {
  return project.edges.find((edge) => edge.id === element.id);
}

function FindProjectNodeByElementId(project: Project, element: FlowElement) {
  return project.nodes.find((node) => node.id === element.id);
}

function CloseInspector(inspectorRef: React.MutableRefObject<HTMLDivElement>, dispatch: Dispatch) {
  dispatch(setModuleVisibility({ type: MODULE_TYPE.INSPECTOR, visible: false, animate: true }));
  SetPanelHeight(inspectorRef, Size.MODULE_CLOSED);
  dispatch(changeInspectorHeight(Size.MODULE_CLOSED));
}

function HandleDeleteOffPageEdge(project: Project, edge: Edge, dispatch: Dispatch) {
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
      const parentConnector = GetParentConnector(transportEdge, n);

      dispatch(setOffPageStatus(parentNode?.id, parentConnector?.id, false));
      dispatch(removeEdge(transportEdge?.id));
      dispatch(removeEdge(partOfEdge?.id));
      dispatch(removeNode(n.id));
    }
  });
}

export default useOnRemove;
