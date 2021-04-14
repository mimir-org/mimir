import { useSelector } from "react-redux";
import { Node } from "../../../models/project";
import { RootState } from "../../../redux/store";

const GetNodes = (): Node[] => {
  const nodes = useSelector<RootState>(
    (state) => state.projectState.project.nodes
  );

  return nodes as Node[];
};

export default GetNodes;
