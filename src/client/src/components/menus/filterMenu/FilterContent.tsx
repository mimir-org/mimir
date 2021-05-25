import { useDispatch } from "react-redux";
import store from "../../../redux/store";
import { changeEdgeVisibility } from "../../../redux/store/project/actions";
import { MenuColumn, MenuSubHeader } from "../../../componentLibrary/box/menus";
import { useState } from "react";
import { CheckEdges } from "./helpers";
import { TextResources } from "../../../assets/textResources";

const FilterContent = ({ type, index }) => {
  const dispatch = useDispatch();
  const nodes = store.getState().projectState.project?.nodes;
  const edges = store.getState().projectState.project?.edges;

  let edge = CheckEdges(nodes, edges, type);
  let isChecked = edges.find((x) => x.id === edge?.id)?.isHidden;
  const [checked, setChecked] = useState(!isChecked);

  const handleChange = () => {
    if (edge) {
      setChecked(!checked);
      dispatch(changeEdgeVisibility(edge, !edge.isHidden));
    }
  };

  return (
    <MenuColumn>
      {index === 0 && (
        <MenuSubHeader>{TextResources.Filter_Other}</MenuSubHeader>
      )}

      <label className={"checkbox"}>
        <input type="checkbox" checked={checked} onChange={handleChange} />
        <span className="checkmark"></span>
        <label className="checkbox_label"></label>
        {type}
      </label>
    </MenuColumn>
  );
};

export default FilterContent;
