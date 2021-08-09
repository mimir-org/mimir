import { addNode, createEdge } from "../../../redux/store/project/actions";
import { IsBlockView } from "../helpers/block";
import { GetEdgeType } from "../helpers/tree";
import { ConvertToEdge, ConvertToNode } from "../converters";
import { CreateBlockNode, CreateTreeEdge, CreateTreeNode } from "../creators";
import {
  BlobData,
  LibraryNodeItem,
  Project,
  GetFileData,
} from "../../../models";
import {
  CreateId,
  FindSelectedNode,
  IsInputTerminal,
  IsOutputTerminal,
  IsPartOfTerminal,
} from "./../helpers/common";
import { LibraryState } from "../../../redux/store/library/types";

const useOnDrop = (
  project: Project,
  event,
  dispatch,
  setElements,
  reactFlowInstance,
  reactFlowWrapper,
  icons: BlobData[],
  library: LibraryState
) => {
  const showBlockView = IsBlockView();
  const sourceNode = FindSelectedNode();
  const isFile =
    event.dataTransfer.files && event.dataTransfer.files.length > 0;

  if (isFile && !showBlockView) {
    event.stopPropagation();
    event.preventDefault();

    (async () => {
      const data = await GetFileData(event, project);

      data[0].forEach((node) => {
        dispatch(addNode(node));
        setElements((es) => es.concat(CreateTreeNode(node)));
      });

      data[1].forEach((edge) => {
        dispatch(createEdge(edge));
        const edgeType = GetEdgeType(edge.fromConnector);
        setElements((es) =>
          es.concat(CreateTreeEdge(edge, edgeType, project.nodes))
        );
      });
    })();
  } else {
    event.preventDefault();
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const data = JSON.parse(
      event.dataTransfer.getData("application/reactflow")
    ) as LibraryNodeItem;

    let position;

    if (!reactFlowInstance) position = { x: event.clientX, y: event.clientY };
    else
      position = reactFlowInstance?.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

    const targetNode = ConvertToNode(data, position, project.id, icons);

    targetNode.connectors?.forEach((c) => {
      c.id = CreateId();
      c.nodeId = targetNode.id;
      c.attributes?.forEach((a) => {
        a.id = CreateId();
      });
    });

    targetNode.attributes?.forEach((a) => {
      a.nodeId = targetNode.id;
      a.id = CreateId();
    });

    showBlockView
      ? setElements((es) => es.concat(CreateBlockNode(targetNode, null)))
      : setElements((es) => es.concat(CreateTreeNode(targetNode)));

    if (sourceNode && sourceNode.aspect === targetNode.aspect) {
      targetNode.level = sourceNode.level + 1;

      const sourceConn = sourceNode.connectors?.find(
        (x) => IsPartOfTerminal(x) && IsOutputTerminal(x)
      );
      const targetConn = targetNode.connectors?.find(
        (x) => IsPartOfTerminal(x) && IsInputTerminal(x)
      );

      const partofEdge = ConvertToEdge(
        CreateId(),
        sourceConn,
        targetConn,
        sourceNode,
        targetNode,
        project.id,
        library
      );

      dispatch(createEdge(partofEdge));

      const edgeType = GetEdgeType(sourceConn);
      setElements((es) =>
        es.concat(CreateTreeEdge(partofEdge, edgeType, project.nodes))
      );
    }
    dispatch(addNode(targetNode));
  }
};

export default useOnDrop;
