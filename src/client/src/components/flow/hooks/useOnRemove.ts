import { Elements, FlowElement, removeElements } from "react-flow-renderer";
import { Dispatch } from "redux";
import { Size } from "../../../compLibrary/size";
import { EDGE_KIND, Edge, Project } from "../../../models";
import { EDGE_TYPE, MODULE_TYPE } from "../../../models/project";
import { SetPanelHeight } from "../../../modules/inspector/helpers";
import { changeInspectorHeight } from "../../../modules/inspector/redux/inspectorSlice";
import { setModuleVisibility } from "../../../redux/store/modules/modulesSlice";
import { removeEdge, removeNode, setOffPageStatus } from "../../../redux/store/project/actions";
import { HandleOffPageDelete } from "../block/nodes/blockOffPageNode/helpers";
import { GetParent, IsPartOf } from "../helpers";
import { GetSelectedBlockNode, GetSelectedNode, IsAspectNode, IsBlockView, IsOffPage } from "../../../helpers";
import { getParentNodeConnector } from "../block/nodes/blockOffPageNode/helpers/HandleOffPageDelete";

/**
 * Hook that runs when an element is deleted from Mimir.
 * If a Node is deleted the connected Edges are also deleted.
 * If an Edge is deleted the connect Nodes will not be deleted, except an edge between OffPageNodes.
 * The removal of an Edge between OffPageNodes will also remove the connected Nodes.
 * @param elements
 * @param blockEdgesToRemove
 * @param inspectorRef
 * @param project
 * @param setElements
 * @param dispatch
 */
const useOnRemove = (
  elements: Elements,
  blockEdgesToRemove: Edge[],
  inspectorRef: React.MutableRefObject<HTMLDivElement>,
  project: Project,
  setElements: React.Dispatch<React.SetStateAction<Elements>>,
  dispatch: Dispatch
) => {
  const elementsToRemove: Elements = [];
  elements = elements.filter((el) => !IsAspectNode(el.data));
  const blockView = IsBlockView();

  const hasDeletedElement = handleDeleteElements(elements, elementsToRemove, project, blockView, dispatch);
  if (blockView) handleBlockEdges(blockEdgesToRemove, project, dispatch);

  if (hasDeletedElement) {
    dispatch(setModuleVisibility({ type: MODULE_TYPE.INSPECTOR, visible: false, animate: true }));
    SetPanelHeight(inspectorRef, Size.MODULE_CLOSED);
    dispatch(changeInspectorHeight(Size.MODULE_CLOSED));
    return setElements((els) => removeElements(elementsToRemove, els));
  }
};

const handleDeleteElements = (
  elements: Elements,
  verifiedList: Elements,
  project: Project,
  blockView: boolean,
  dispatch: Dispatch
) => {
  const selectedNode = blockView ? GetSelectedBlockNode() : GetSelectedNode();
  const edgeTypes = Object.values(EDGE_TYPE);
  let hasDeletedElement = false;

  for (const elem of elements) {
    const isEdge = isElementEdge(edgeTypes, elem);

    if (isEdge) {
      if (!IsAspectNode(selectedNode) && !findProjectEdgeByElementId(project, elem)?.isLocked) {
        hasDeletedElement = true;

        handleRelatedOffPageElements(project, elem?.data?.edge, dispatch);
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

const handleBlockEdges = (edgesToRemove: Edge[], project: Project, dispatch: Dispatch) => {
  if (edgesToRemove.length !== 0) {
    edgesToRemove.forEach((edge) => {
      handleRelatedOffPageElements(project, edge, dispatch);
      dispatch(removeEdge(edge.id));
    });
  }
};

const handleRelatedOffPageElements = (project: Project, edge: Edge, dispatch: Dispatch) => {
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
        (x) => IsOffPage(x.toNode) && x.toNodeId === node.id && x.toConnectorId === offPagePartOfTerminal?.id
      );

      const parentNode = GetParent(node);
      const parentNodeConnector = getParentNodeConnector(offPageTransportEdge, node);
      const parentConnectorIsRequired = false;

      dispatch(setOffPageStatus(parentNode?.id, parentNodeConnector?.id, parentConnectorIsRequired));
      dispatch(removeEdge(offPageTransportEdge?.id));
      dispatch(removeEdge(offPagePartOfEdge?.id));
      dispatch(removeNode(node.id));
    }
  });
};

export default useOnRemove;
