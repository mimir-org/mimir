import { useReactFlow } from "react-flow-renderer";

export const GetSelectedNodes = () => {
  return useReactFlow()
    .getNodes()
    .filter((n) => n.selected);
};
