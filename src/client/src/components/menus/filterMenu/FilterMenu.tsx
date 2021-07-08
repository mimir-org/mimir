import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { FilterContent } from ".";
import { Aspect, Project, RelationType } from "../../../models";
import { MenuBox, MenuColumn } from "../../../compLibrary/box/menus";
import { AddElement } from "./helpers";
import {
  FilterElement,
  IsLocationTerminal,
  IsPartOfTerminal,
  IsTransportTerminal,
} from "../../flow/helpers/common";

const FilterMenu = () => {
  const project = useSelector<RootState>(
    (state) => state.projectState.project
  ) as Project;

  const nodes = project.nodes?.filter((x) => !x.isHidden);
  const edges = project.edges;

  let elements = [] as FilterElement[];

  nodes.forEach((node) => {
    elements.push.apply(elements, AddElement(node, edges));
  });

  // Remove duplicates
  elements = elements.filter(
    (v, i, a) =>
      a.findIndex(
        (t) => t.type === v.type && t.fromNode?.aspect === v.fromNode?.aspect
      ) === i
  );

  let isTransport = false;
  let isLocation = false;
  let isPartOf = false;

  elements.forEach((elem) => {
    if (IsTransportTerminal(elem.conn)) isTransport = true;
    if (IsLocationTerminal(elem.conn)) isLocation = true;
    if (IsPartOfTerminal(elem.conn)) isPartOf = true;
  });

  return (
    <MenuBox right>
      <MenuColumn>
        {isTransport && (
          <FilterContent type={"Transport"} name={"Transport"} header={true} />
        )}
        {elements.map(
          (x) =>
            IsTransportTerminal(x.conn) && (
              <FilterContent
                conn={x.conn}
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
            type={"Part of Relationship"}
            name={"Part of Relationship"}
            header={true}
          />
        )}
        {elements.map(
          (x) =>
            x.type === RelationType.PartOf && (
              <FilterContent
                conn={x.conn}
                type={x.type}
                name={"Part of " + Aspect[x.fromNode?.aspect]}
                key={x.id}
                header={false}
                node={x.fromNode}
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
          (x) =>
            x.type === RelationType.HasLocation && (
              <FilterContent
                conn={x.conn}
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
