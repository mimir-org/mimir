import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const GetEdges = () => {
  const edges: any = useSelector<RootState>(
    (state) => state.projectState.project.edges
  );
  return edges;
};

export default GetEdges;
