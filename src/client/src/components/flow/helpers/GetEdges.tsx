import { useSelector } from "react-redux";
import { Edge } from "../../../models/project";
import { RootState } from "../../../redux/store";
import { ProjectState } from "../../../redux/store/project/types";

const GetNodes = (): Edge[] => {
  const projectState = useSelector<RootState>(
    (state) => state.projectState
  ) as ProjectState;

  return projectState.project.edges;
};

export default GetNodes;
