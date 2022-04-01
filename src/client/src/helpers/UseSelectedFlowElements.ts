import { useMemo } from "react";
import { GetTreeEdgeTypes, GetTreeNodeTypes } from "../components/flow/tree/helpers";
import { GetSelectedEdges, GetSelectedNodes } from "./Selected";

export const useSelectedFlowElements = () => {
  const selectedNodes = GetSelectedNodes();
  const selectedEdges = GetSelectedEdges();
  console.log("KAI ER SØT");

  const nodeIds = useMemo(() => selectedNodes?.filter((ele) => GetTreeNodeTypes[ele.type]).map((ele) => ele.id), [selectedNodes]);
  const edgeIds = useMemo(() => selectedEdges?.filter((ele) => GetTreeEdgeTypes[ele.type]).map((ele) => ele.id), [selectedEdges]);

  return [nodeIds, edgeIds];
};
