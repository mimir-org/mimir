import { useSelector } from "react-redux";
import { Node } from "../../../../models";
import { RootState } from "../../../../redux/store";
import { ProjectState } from "../../../../redux/store/project/types";

const GetNodes = (): Node[] => {
  const projectState = useSelector<RootState>(
    (state) => state.projectState
  ) as ProjectState;

  return projectState.project.nodes;
};

export default GetNodes;
