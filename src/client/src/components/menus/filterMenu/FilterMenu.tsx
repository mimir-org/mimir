import { RootState } from "../../../redux/store";
import { FilterContent } from ".";
import { Connector, Node, Edge, Project, RelationType } from "../../../models";
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

  let elements = [] as {
    id: string;
    type: RelationType | string;
    name: string;
  }[];

  nodes.forEach((node) => {
    elements.push.apply(elements, AddElement(node, edges));
  });

  elements = elements.filter(
    (value, index, self) =>
      self.map((x) => x.type).indexOf(value.type) === index
  );

  let isTransport = false;
  let isLocation = false;
  let isPartOf = false;

  // TODO: Rewrite
  elements.forEach((elem) => {
    if (
      elem.type === "Oil" ||
      elem.type === "Gas" ||
      elem.type === "Water" ||
      elem.type === "Multiphase"
    )
      isTransport = true;
    if (elem.type === RelationType.HasLocation) isLocation = true;
    if (elem.type === RelationType.PartOf) isPartOf = true;
  });

  return (
    <MenuBox right>
      <MenuColumn>
        {isTransport && (
          <FilterContent type={"Transport"} name={"Transport"} header={true} />
        )}
        {elements.map(
          (x, i) =>
            (x.type === "Oil" ||
              x.type === "Gas" ||
              x.type === "Water" ||
              x.type === "Multiphase") && (
              <FilterContent
                type={x.type}
                name={x.name}
                key={x.id}
                header={false}
              />
            )
        )}
        <br></br>
        {isPartOf && (
          <FilterContent
            type={RelationType.PartOf}
            name={"Part of Relationship"}
            header={true}
          />
        )}
        {elements.map(
          (x, i) =>
            x.type === RelationType.PartOf && (
              <FilterContent
                type={x.type}
                name={x.name}
                key={x.id}
                header={false}
              />
            )
        )}
        <br></br>
        {isLocation && (
          <FilterContent
            type={RelationType.HasLocation}
            name={"Location"}
            header={true}
          />
        )}
        {elements.map(
          (x, i) =>
            x.type === RelationType.HasLocation && (
              <FilterContent
                type={x.type}
                name={x.name}
                key={x.id}
                header={false}
              />
            )
        )}
        <br></br>
      </MenuColumn>
    </MenuBox>
  );
};

export default FilterMenu;
