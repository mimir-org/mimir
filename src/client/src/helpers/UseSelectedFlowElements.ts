import { useMemo } from "react";
import { useReactFlow } from "react-flow-renderer";
import { GetTreeEdgeTypes, GetTreeNodeTypes } from "../components/flow/tree/helpers";

export const useSelectedFlowElements = () => {
  // const elements = useStoreState((state) => state.selectedElements);
  const elements = useReactFlow()
    .getNodes()
    .filter((n) => n.selected);

  const nodeIds = useMemo(() => elements?.filter((ele) => GetTreeNodeTypes[ele.type]).map((ele) => ele.id), [elements]);
  // const edgeIds = useMemo(() => elements?.filter((ele) => GetTreeEdgeTypes[ele.type]).map((ele) => ele.id), [elements]);

  return [nodeIds, []];
};
