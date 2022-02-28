import { useMemo } from "react";
import { useStoreState } from "react-flow-renderer";
import { GetTreeEdgeTypes, GetTreeNodeTypes } from "../components/flow/tree/helpers";

export const useSelectedFlowElements = () => {
  const elements = useStoreState((state) => state.selectedElements);

  const nodeIds = useMemo(() => elements?.filter((ele) => GetTreeNodeTypes[ele.type]).map((ele) => ele.id), [elements]);
  const edgeIds = useMemo(() => elements?.filter((ele) => GetTreeEdgeTypes[ele.type]).map((ele) => ele.id), [elements]);

  return [nodeIds, edgeIds];
};
