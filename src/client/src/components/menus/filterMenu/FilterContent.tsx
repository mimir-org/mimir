import { useDispatch } from "react-redux";
import { useState } from "react";
import { IsBlockView } from "../../flow/helpers/block";
import { Connector, Edge, Node, RelationType } from "../../../models";
import { MenuSubHeader } from "../../../compLibrary/box/menus";
import {
  changeEdgeVisibility,
  changeActiveConnector,
} from "../../../redux/store/project/actions";
import {
  CheckBlockEdges,
  CheckEdges,
  FindConnectorNode,
  IsChecked,
  IsEdge,
} from "./helpers";

interface Props {
  conn?: Connector;
  type: RelationType | string;
  name: string;
  header: boolean;
  node?: Node;
  edges: Edge[];
}

const FilterContent = ({ conn, type, name, header, node, edges }: Props) => {
  const dispatch = useDispatch();
  const isVisible = name !== null;

  let selectedElements = !IsBlockView()
    ? CheckEdges(edges, type, node)
    : CheckBlockEdges(edges, type);

  const [, setChecked] = useState(IsChecked(type, edges, conn, node, name));

  const onChange = () => {
    if (edges) {
      setChecked(IsChecked(type, edges, conn, node, name));
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
      <input
        type="checkbox"
        checked={IsChecked(type, edges, conn, node, name)}
        onChange={onChange}
      />
      <span className="checkmark"></span>
      {<MenuSubHeader>{name}</MenuSubHeader>}
    </label>
  ) : (
    <label className={"checkbox-filter"}>
      {isVisible && (
        <>
          <input
            type="checkbox"
            checked={IsChecked(type, edges, conn, node, name)}
            onChange={onChange}
          />
          <span className="checkmark-filter"></span>
          {name}
        </>
      )}
    </label>
  );
};

export default FilterContent;
