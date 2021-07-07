import { RootState } from "../../../redux/store";
import { FilterContent } from ".";
import { Connector, Node, Edge, Project } from "../../../models";
import { MenuBox, MenuColumn } from "../../../compLibrary/box/menus";
import { useSelector } from "react-redux";
import { IsTransportTerminal } from "../../flow/helpers/common";

const AddElement = (
  node: Node,
  edges: Edge[]
): { id: string; type: string }[] => {
  const IsActive = (conn: Connector) => {
    let found = false;

    edges.forEach((edge) => {
      if (edge.fromConnectorId === conn.id) {
        found = true;
        return;
      }
    });
    return found;
  };

  let elements = [] as { id; type; name }[];
  elements = node?.connectors
    ?.filter((conn) => IsActive(conn))
    .map((x) => {
      return {
        id: x.id,
        type: IsTransportTerminal(x) ? x.name : x.relationType,
        name: x.name,
      };
    });

  return elements;
};

const FilterMenu = () => {
  const project = useSelector<RootState>(
    (state) => state.projectState.project
  ) as Project;

  const nodes = project.nodes?.filter((x) => !x.isHidden);
  const edges = project.edges;
  let elements = [] as { id: string; type: string; name: string }[];

  nodes.forEach((node) => {
    elements.push.apply(elements, AddElement(node, edges));
  });

  elements = elements.filter(
    (value, index, self) =>
      self.map((x) => x.type).indexOf(value.type) === index
  );

  return (
    <MenuBox right>
      <MenuColumn>
        <FilterContent type={"Hide all"} name={"Hide all"} />

        {elements.map(
          (x, i) =>
            i % 2 === 0 && (
              <FilterContent type={x.type} name={x.name} key={x.id} />
            )
        )}
      </MenuColumn>
      <MenuColumn>
        <FilterContent type={"Transport"} name={"Transport"} />

        {elements.map(
          (x, i) =>
            i % 2 !== 0 && (
              <FilterContent type={x.name} name={x.name} key={x.id} />
            )
        )}
      </MenuColumn>
    </MenuBox>
  );
};

export default FilterMenu;
