import { useDispatch } from "react-redux";
import red from "../../../redux/store";
import { changeEdgeVisibility } from "../../../redux/store/project/actions";
import { useState } from "react";
import { CheckEdges } from "./helpers";

const FilterContent = ({ type, index }) => {
  const dispatch = useDispatch();
  const nodes = red.store.getState().projectState.project?.nodes;
  const edges = red.store.getState().projectState.project?.edges;

  let edgesRemove = CheckEdges(nodes, edges, type);
  let isChecked = edges.find((x) => x.id === edgesRemove[0]?.id)?.isHidden;
  const [checked, setChecked] = useState(!isChecked);

  const handleChange = () => {
    // if type === typeOf RELATION_TYPE
    if (edges) {
      setChecked(!checked);
      edgesRemove.forEach((_edge, index) => {
        dispatch(
          changeEdgeVisibility(edgesRemove[index], !edgesRemove[index].isHidden)
        );
      });
    }
    // if type === typeOf TERMINAL
    // if type === typeOf TERMINAL_CATEGORY
  };

  return (
    <label className={"checkbox-filter"}>
      <input type="checkbox" checked={checked} onChange={handleChange} />
      <span className="checkmark-filter"></span>
      {type}
    </label>
  );
};

export default FilterContent;
