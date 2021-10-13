import red from "../../../redux/store";
import { Edge } from "../../../models";

const GetSelectedEdge = () => {
  const edges = red.store.getState().projectState?.project?.edges as Edge[];
  return edges?.find((edge) => edge?.isSelected);
};

export default GetSelectedEdge;
