import { useMemo } from "react";
import { useStoreState } from "react-flow-renderer";
import { GetEdgeTypes, GetNodeTypes } from "../components/flow/tree/helpers";

export const useSelectedFlowElements = () => {
  const elements = useStoreState((state) => state.selectedElements);

  const nodeIds = useMemo(() => elements?.filter((ele) => GetNodeTypes[ele.type]).map((ele) => ele.id), [elements]);
  const edgeIds = useMemo(() => elements?.filter((ele) => GetEdgeTypes[ele.type]).map((ele) => ele.id), [elements]);

  return [nodeIds, edgeIds];
};
