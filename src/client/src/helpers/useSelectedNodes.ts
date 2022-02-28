import { useMemo } from "react";
import { useStoreState } from "react-flow-renderer";
import { GetTreeNodeTypes } from "../components/flow/tree/helpers";

export const useSelectedNodes = () => {
  const elements = useStoreState((state) => state.selectedElements);
  const nodes = useMemo(() => elements?.filter((ele) => GetTreeNodeTypes[ele.type]).map((ele) => ele.id), [elements]);
  return [nodes];
};
