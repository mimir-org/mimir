import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { DiagramComponent, TreeviewComponent } from "..";
import { getWorkspace } from "../../redux/store/workspace/actions";
import { WorkspaceState } from "../../redux/store/workspace/types";
import { RootState } from "./../../redux/store/index";
import textResources from "../../textResources";
// import { UserState } from "../../store/user/types";
// import { SETTING_KEY, SETTING_VALUE } from "./../../models/user";
// import { getUser } from "../../store/user/actions";

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
    // dispatch(getUser("rl", "rl"));
  }, [dispatch]);

  const params = useParams<RouteParams>();
  const isOnline =
    workspaceState && workspaceState.workspace && !workspaceState.fetching;

  return (
    <div className="container">
		<div className="explorer_view">{textResources.Explorer_view}</div>
		<div className="middle_content">
			<div className="workspace">
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
			<div className="inspector">{textResources.Inspector}</div>
		</div>
		<div className="library">{textResources.Library}</div>
	</div>
  );
};

export default Home;
