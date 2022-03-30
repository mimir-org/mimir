import { useMemo } from "react";
import { useStore } from "react-flow-renderer";
import { GetTreeNodeTypes } from "../components/flow/tree/helpers";

export const useSelectedNodes = () => {
  // const elements = useStore((store) => store. state.selectedElements);
  // const nodes = useMemo(() => elements?.filter((ele) => GetTreeNodeTypes[ele.type]).map((ele) => ele.id), [elements]);
  // return [nodes];
  return [];
};
