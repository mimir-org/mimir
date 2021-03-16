import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NodetypesState } from "./../../redux/store/nodetypes/types";
import { getnodetypes } from "./../../redux/store/nodetypes/actions";
import { NodeTypeComponent } from "./NodeTypeComponent";
import { RootState } from "./../../redux/store/index";

const NodeTypeOverview = () => {
  const dispatch = useDispatch();

  const state = useSelector<RootState>(
    (state) => state.nodetype
  ) as NodetypesState;

  useEffect(() => {
    dispatch(getnodetypes());
  }, [dispatch]);

  return (
    <div className="node-types">
      {state.nodetypes &&
        state.nodetypes.map((item) => {
          return (
            <NodeTypeComponent
              key={item.id}
              id={item.id}
              name={item.name}
              color={item.color}
            />
          );
        })}
    </div>
  );
};

export default NodeTypeOverview;
