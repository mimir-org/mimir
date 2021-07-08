import red from "../../../redux/store";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { IsBlockView } from "../../flow/helpers/block";
import { Edge, RelationType } from "../../../models";
import { MenuSubHeader } from "../../../compLibrary/box/menus";
import {
  IsLocationTerminal,
  IsPartOfTerminal,
  IsTransportTerminal,
} from "../../flow/helpers/common";
import {
  changeEdgeVisibility,
  changeActiveConnector,
} from "../../../redux/store/project/actions";
import {
  CheckBlockEdges,
  CheckEdges,
  FindConnectorNode,
  IsEdge,
} from "./helpers";

const FilterContent = ({ type, name, header }) => {
  const dispatch = useDispatch();
  const edges = red.store.getState().projectState.project?.edges as Edge[];

  let selectedElements = !IsBlockView()
    ? CheckEdges(edges, type)
    : CheckBlockEdges(edges, type);

  // TODO: Rewrite
  const isChecked = () => {
    if (type === "Transport") {
      const edge = edges.find((edge) =>
        IsTransportTerminal(edge.fromConnector)
      );
      return !edge?.isHidden;
    }

    if (type === "Oil") {
      const edge = edges.find((edge) => edge.fromConnector.name === "Oil");
      return !edge?.isHidden;
    }

    if (type === "Gas") {
      const edge = edges.find((edge) => edge.fromConnector.name === "Gas");
      return !edge?.isHidden;
    }

    if (type === "Water") {
      const edge = edges.find((edge) => edge.fromConnector.name === "Water");
      return !edge?.isHidden;
    }

    if (type === "Multiphase") {
      const edge = edges.find(
        (edge) => edge.fromConnector.name === "Multiphase"
      );
      return !edge?.isHidden;
    }

    if (type === RelationType.HasLocation) {
      const edge = edges.find((edge) => IsLocationTerminal(edge.fromConnector));
      return !edge?.isHidden;
    }

    if (type === RelationType.PartOf) {
      const edge = edges.find((edge) => IsPartOfTerminal(edge.fromConnector));
      return !edge?.isHidden;
    }
  };

  const [, setChecked] = useState(isChecked());

  const onChange = () => {
    if (edges) {
      setChecked(isChecked());
      selectedElements.forEach((element) => {
        if (IsEdge(element)) {
          dispatch(changeEdgeVisibility(element, !element.isHidden));
        } else {
          const connNode = FindConnectorNode(element);
          dispatch(
            changeActiveConnector(connNode, element.id, !element.visible, 0)
          );
        }
      });
    }
  };

  return header ? (
    <label className={"checkbox"}>
      <input type="checkbox" checked={isChecked()} onChange={onChange} />
      <span className="checkmark"></span>
      {<MenuSubHeader>{name}</MenuSubHeader>}
    </label>
  ) : (
    <label className={"checkbox-filter"}>
      <input type="checkbox" checked={isChecked()} onChange={onChange} />
      <span className="checkmark-filter"></span>
      {name}
    </label>
  );
};

export default FilterContent;
