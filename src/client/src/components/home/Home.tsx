import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { TreeviewComponent } from "..";
import { ExplorerModule } from "../modules/explorerModule";
import { InspectorModule } from "../modules/inspectorModule";
import { LibraryModule } from "../modules/libraryModule";
import { getUser } from "../../redux/store/user/actions";

interface RouteParams {
  type: string;
}

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const params = useParams<RouteParams>();

  return (
    <div className="home_container">
      <ExplorerModule />
      <div className="middle_content">
        <div className="workspace">
          <>
            {params.type === "treeview" && <TreeviewComponent />}
            {params.type === "diagram" && <TreeviewComponent />}
            {/* BlockView kommer her */}
          </>
        </div>
        <InspectorModule />
      </div>
      <LibraryModule />
    </div>
  );
};

export default Home;
