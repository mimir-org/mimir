import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DiagramComponent } from "..";
import TreeviewComponent from "../../components/treeview/TreeviewComponent";
import { getWorkspace } from "../../store/workspace/actions";
import { WorkspaceState } from "../../store/workspace/types";
import { RootState } from "./../../store/index";

const Home = () => {

  const workspaceState = useSelector<RootState>(state => state.workspace) as WorkspaceState;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getWorkspace());
      }, [dispatch]);

  return (
    <React.Fragment>
      {/* <DiagramComponent /> */}
      {workspaceState &&
        workspaceState.workspace &&
        !workspaceState.fetching && (
          <TreeviewComponent root={workspaceState.workspace.root} aspects={workspaceState.workspace.aspects}/>
        )}
      

    </React.Fragment>
  );
};

export default Home;
