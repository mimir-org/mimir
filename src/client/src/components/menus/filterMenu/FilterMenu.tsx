import { isLibOpenSelector, projectSelector, useAppSelector } from "../../../redux/store";
import { FilterContent } from ".";
import { Aspect, RelationType } from "../../../models";
import { FilterMenuBox, MenuColumn } from "../../../compLibrary/box/menus";
import { AddElement } from "./helpers";
import { TextResources } from "../../../assets/text";
import { CreateId, FilterElement, IsLocationTerminal, IsPartOfTerminal, IsTransportTerminal } from "../../flow/helpers";

const FilterMenu = () => {
  const project = useAppSelector(projectSelector);
  const isLibraryOpen = useAppSelector(isLibOpenSelector);
  const nodes = project?.nodes?.filter((x) => !x.isHidden) ?? [];
  const edges = project?.edges;
  let elements = [] as FilterElement[];

  nodes.forEach((node) => {
    elements.push.apply(elements, AddElement(node, edges));
  });

  // Remove duplicates
  elements = elements.filter(
    (value, index, elems) =>
      elems.findIndex((elem) => elem.type === value.type && elem.fromNode?.aspect === value.fromNode?.aspect) === index
  );

  let isTransport = false;
  let isLocation = false;
  let isPartOf = false;
  let transportCount = 0;
  let partOfCount = 0;
  let locationCount = 0;

  elements.forEach((elem) => {
    if (IsTransportTerminal(elem.conn)) {
      transportCount++;
      isTransport = true;
    }
    if (IsLocationTerminal(elem.conn)) {
      locationCount++;
      isLocation = true;
    }
    if (IsPartOfTerminal(elem.conn)) {
      partOfCount++;
      isPartOf = true;
    }
  });

  // TODO: refactor
  return (
    <FilterMenuBox isLibraryOpen={isLibraryOpen}>
      <MenuColumn>
        {isPartOf && (
          <FilterContent
            type={TextResources.Relations_PartOf_Relationship}
            name={TextResources.Relations_PartOf_Relationship}
            header={true}
            edges={edges}
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
                edges={edges}
              />
            )
        )}
        {partOfCount % 2 !== 0 && (
          <FilterContent conn={null} type={null} name={null} key={CreateId()} header={false} edges={edges} />
        )}
        <br></br>
        {isTransport && (
          <FilterContent
            type={TextResources.Relations_Transport}
            name={TextResources.Relations_Transport}
            header={true}
            edges={edges}
          />
        )}
        {elements.map(
          (x) =>
            IsTransportTerminal(x.conn) && (
              <FilterContent conn={x.conn} type={x.type} name={x.name} key={x.id} header={false} edges={edges} />
            )
        )}
        {transportCount % 2 !== 0 && (
          <FilterContent conn={null} type={null} name={null} key={CreateId()} header={false} edges={edges} />
        )}
        <br></br>

        {isLocation && (
          <FilterContent
            type={TextResources.Aspect_Location}
            name={TextResources.Relations_HasLocation}
            header={true}
            edges={edges}
          />
        )}
        {elements.map(
          (x) =>
            x.type === RelationType.HasLocation && (
              <FilterContent
                conn={x.conn}
                type={x.type}
                name={Aspect[x.fromNode?.aspect] + " " + TextResources.Aspect_Location}
                key={x.id}
                header={false}
                node={x.fromNode}
                edges={edges}
              />
            )
        )}
        {locationCount % 2 !== 0 && (
          <FilterContent conn={null} type={null} name={null} key={CreateId()} header={false} edges={edges} />
        )}
      </MenuColumn>
    </FilterMenuBox>
  );
};

export default FilterMenu;
