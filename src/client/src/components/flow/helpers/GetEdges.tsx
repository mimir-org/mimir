import { useSelector } from "react-redux";
import { Edge } from "../../../models/project";
import { RootState } from "../../../redux/store";

const GetEdges = (): Edge[] => {
  const edges = useSelector<RootState>(
    (state) => state.projectState.project.edges
  );
  return edges as Edge[];
};

export default GetEdges;
