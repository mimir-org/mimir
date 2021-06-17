import red from "../../../redux/store";
import { useDispatch } from "react-redux";
import { changeEdgeVisibility } from "../../../redux/store/project/actions";
import { useState } from "react";
import { CheckEdges } from "./helpers";
import { Edge } from "../../../models";

const FilterContent = ({ type, index }) => {
  const dispatch = useDispatch();
  const edges = red.store.getState().projectState.project?.edges as Edge[];
  let selectedEdges = CheckEdges(edges, type);

  let isChecked = edges.find((x) => x.id === selectedEdges[0]?.id)?.isHidden;
  const [checked, setChecked] = useState(!isChecked);

  const handleChange = () => {
    if (edges) {
      setChecked(!checked);
      selectedEdges.forEach((edge) => {
        dispatch(changeEdgeVisibility(edge, !edge.isHidden));
      });
    }
  };

  // TODO: Get name for type
  return (
    <label className={"checkbox-filter"}>
      <input type="checkbox" checked={checked} onChange={handleChange} />
      <span className="checkmark-filter"></span>
      Part Of
    </label>
  );
};

export default FilterContent;
