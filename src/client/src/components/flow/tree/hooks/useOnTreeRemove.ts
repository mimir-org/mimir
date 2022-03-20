import { Elements, removeElements } from "react-flow-renderer";
import { Dispatch } from "redux";
import { Project } from "../../../../models";
import { EDGE_TYPE } from "../../../../models/project";
import { removeEdge, removeNode } from "../../../../redux/store/project/actions";
import { GetSelectedNode, IsAspectNode } from "../../../../helpers";
import { CloseInspector } from "../../handlers";
import { FindProjectEdgeByElementId, FindProjectNodeByElementId, IsElementEdge } from "../../helpers";

/**
 * Hook that runs when an element is deleted from Mimir in TreeView.
 * If a Node is deleted the connected Edges are also deleted.
 * If an Edge is deleted the connect Nodes will not be deleted.
 * @param elements
 * @param inspectorRef
 * @param project
 * @param setElements
 * @param dispatch
 */
const useOnTreeRemove = (
  elements: Elements,
  inspectorRef: React.MutableRefObject<HTMLDivElement>,
  project: Project,
  setElements: React.Dispatch<React.SetStateAction<Elements>>,
  dispatch: Dispatch
) => {
  const elementsToRemove: Elements = [];

  HandleElementsToRemove(elements, elementsToRemove, project, dispatch);

  if (elementsToRemove.length) {
    CloseInspector(inspectorRef, dispatch);
    return setElements((els) => removeElements(elementsToRemove, els));
  }
};

const HandleElementsToRemove = (elements: Elements, elementsToRemove: Elements, project: Project, dispatch: Dispatch) => {
  const selectedNode = GetSelectedNode();
  const edgeTypes = Object.values(EDGE_TYPE);

  elements.forEach((elem) => {
    if (IsAspectNode(elem.data)) return;

    if (IsElementEdge(edgeTypes, elem)) {
      if (!IsAspectNode(selectedNode) && !FindProjectEdgeByElementId(project, elem)?.isLocked) {
        dispatch(removeEdge(elem.id));
        elementsToRemove.push(elem);
      }
    } else {
      const node = FindProjectNodeByElementId(project, elem);
      if (!node?.isLocked) {
        dispatch(removeNode(elem.id));
        elementsToRemove.push(elem);
      }
    }
  });
};

export default useOnTreeRemove;
