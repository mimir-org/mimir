import { useMemo } from "react";
import { useStoreState } from "react-flow-renderer";
import { GetNodeTypes } from "../components/flow/tree/helpers";

export const useSelectedNodes = () => {
  const elements = useStoreState((state) => state.selectedElements);
  const nodes = useMemo(() => elements?.filter((ele) => GetNodeTypes[ele.type]).map((ele) => ele.id), [elements]);
  return [nodes];
};
