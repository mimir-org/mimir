import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { FilterContent } from ".";
import { Aspect, Project, RelationType } from "../../../models";
import { MenuBox, MenuColumn } from "../../../compLibrary/box/menus";
import { AddElement } from "./helpers";
import { TextResources } from "../../../assets/text";
import {
  CreateId,
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
    (value, index, elements) =>
      elements.findIndex(
        (elem) =>
          elem.type === value.type &&
          elem.fromNode?.aspect === value.fromNode?.aspect
      ) === index
  );

  let isTransport = false;
  let isLocation = false;
  let isPartOf = false;
  let transportCount = 0;

  elements.forEach((elem) => {
    if (IsTransportTerminal(elem.conn)) {
      transportCount++;
      isTransport = true;
    }
    if (IsLocationTerminal(elem.conn)) {
      isLocation = true;
    }
    if (IsPartOfTerminal(elem.conn)) {
      isPartOf = true;
    }
  });

  return (
    <MenuBox right>
      <MenuColumn>
        {isTransport && (
          <FilterContent
            type={TextResources.Filter_Transport}
            name={TextResources.Filter_Transport}
            header={true}
          />
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
        {transportCount % 2 !== 0 && (
          <FilterContent
            conn={null}
            type={null}
            name={null}
            key={CreateId()}
            header={false}
          />
        )}
        <br></br>
        {isPartOf && (
          <FilterContent
            type={TextResources.Relations_PartOf}
            name={TextResources.Relations_PartOf}
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
            type={TextResources.Filter_Location}
            name={TextResources.Relations_HasLocation}
            header={true}
          />
        )}
        {elements.map(
          (x) =>
            x.type === RelationType.HasLocation && (
              <FilterContent
                conn={x.conn}
                type={x.type}
                name={
                  Aspect[x.fromNode?.aspect] +
                  " " +
                  TextResources.Filter_Location
                }
                key={x.id}
                header={false}
                node={x.fromNode}
              />
            )
        )}
      </MenuColumn>
    </MenuBox>
  );
};

export default FilterMenu;
