import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const GetNodesFromState = () => {
  const nodes: any = useSelector<RootState>(
    (state) => state.projectState.project.nodes
  );

  return nodes;
};

export default GetNodesFromState;
