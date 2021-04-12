import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { DiagramComponent, TreeviewComponent } from "..";
import { getWorkspace } from "../../redux/store/workspace/actions";
import { WorkspaceState } from "../../redux/store/workspace/types";
import { RootState } from "./../../redux/store/index";
import { ProjectModule } from "./../modules/projectModule";
import { ExplorerModule } from "../modules/explorerModule";
import { InspectorModule } from "../modules/inspectorModule";
import { LibraryModule } from "../modules/libraryModule";
// import { UserState } from "../../store/user/types";
// import { SETTING_KEY, SETTING_VALUE } from "./../../models/user";
import { getUser } from "../../redux/store/user/actions";

interface RouteParams {
  type: string;
}

const Home = () => {
  const workspaceState = useSelector<RootState>(
    (state) => state.workspace
  ) as WorkspaceState;
  // const userState = useSelector<RootState>((state) => state.user) as UserState;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWorkspace());
    dispatch(getUser());
  }, [dispatch]);

  const params = useParams<RouteParams>();

  const isOnline =
    workspaceState && workspaceState.workspace && !workspaceState.fetching;

  return (
    <div className="home_container">
      <ExplorerModule />
      <div className="middle_content">
        <div className="workspace">
          {/* <ProjectModule /> */}
          {isOnline && (
            <>
              {params.type === "treeview" && (
                <TreeviewComponent
                  root={workspaceState.workspace.root}
                  aspects={workspaceState.workspace.aspects}
                  aspectDescriptors={workspaceState.workspace.aspectDescriptors}
                />
              )}
              {params.type === "diagram" && (
                <DiagramComponent
                  root={workspaceState.workspace.root}
                  aspects={workspaceState.workspace.aspects}
                  aspectDescriptors={workspaceState.workspace.aspectDescriptors}
                />
              )}
            </>
          )}
        </div>
        <InspectorModule />
      </div>
      <LibraryModule />
    </div>
  );
};

export default Home;
