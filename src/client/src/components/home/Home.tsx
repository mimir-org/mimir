import React from "react";
// import { useDispatch, useSelector } from "react-redux";
import { DiagramComponent } from "..";
// import { getWorkspace } from "../../store/workspace/actions";
// import { WorkspaceState } from "../../store/workspace/types";
// import { RootState } from "./../../store/index";

const Home = () => {
  // const workspaceState = useSelector<RootState>(
  //   (state) => state.workspace
  // ) as WorkspaceState;
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getWorkspace({ id: 1, name: "jsv", nodes: [] }));
  // }, [dispatch]);

  return (
    <React.Fragment>
      <DiagramComponent />
      

    </React.Fragment>
  );
};

export default Home;
