import { useReactFlow } from "react-flow-renderer";

export const useSelectedNodes = () => {
  return useReactFlow()
    .getNodes()
    .filter((n) => n.selected);
};
