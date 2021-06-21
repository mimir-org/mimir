import { useSelector } from "react-redux";
import { Edge } from "../../../../models";
import { RootState } from "../../../../redux/store";
import { ProjectState } from "../../../../redux/store/project/types";

const GetEdges = (): Edge[] => {
  const projectState = useSelector<RootState>(
    (state) => state.projectState
  ) as ProjectState;

  return projectState.project.edges;
};

export default GetEdges;
