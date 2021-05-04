import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { ExplorerModule } from "../modules/explorerModule";
import { InspectorModule } from "../modules/inspectorModule";
import { LibraryModule } from "../modules/libraryModule";
import { AccountModule } from "../modules/accountModule";
import { FilterModule } from "../modules/filterModule";
import { getUser } from "../../redux/store/user/actions";
import { FlowTree, FlowBlock } from "../flow";

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
            {params.type === "treeview" && (
              <div className="treeview_component">
                <div className="treestructur_container">
                  <FlowTree />
                </div>
              </div>
            )}
            {params.type === "blockview" && (
              <div className="treeview_component">
                <div className="treestructur_container">
                  <FlowBlock />
                </div>
              </div>
            )}
          </>
        </div>
        <InspectorModule />
      </div>
      <AccountModule />
      <FilterModule />
      <LibraryModule />
    </div>
  );
};

export default Home;
