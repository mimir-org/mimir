import { useReactFlow } from "react-flow-renderer";

export const GetSelectedEdges = () => {
  return useReactFlow()
    .getEdges()
    .filter((edge) => edge.selected);
};
