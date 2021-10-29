import { ListElementsContainer } from "../../compLibrary";
import { ListType } from "../TypeEditorList";
import {
  RDSElement,
  ObjectBlockElement,
  TransportInterfaceElement,
  PredefinedLocationElement,
  AttributeElement,
  LocationAttributeElement,
  SimpleTypeElement,
} from ".";
import {
  CreateLibraryType,
  Discipline,
  Rds,
  PredefinedAttribute,
  AttributeType,
  CompositeType,
  TerminalTypeDict,
} from "../../models";
import {
  IsTransport,
  IsInterface,
  GetFilteredList,
  GetDefaultTerminals,
  GetDefaultTerminal,
  RemoveBackground,
  RemoveHover,
  ShowObjectBlock,
  SwitchBackground,
} from "../helpers";

interface Props {
  disabled?: boolean;
  listType: ListType;
  items: Rds[] | TerminalTypeDict | AttributeType[] | CompositeType[] | PredefinedAttribute[];
  listItems: Rds[] | TerminalTypeDict | AttributeType[] | CompositeType[] | PredefinedAttribute[];
  createLibraryType: CreateLibraryType;
  discipline?: Discipline;
  onChange: Function;
}
/**
 * Component that shows content in list based on list type
 * @param param0
 * @returns list-elements based on search and list type
 */

export const ListContent = ({ disabled, listType, items, listItems, createLibraryType, discipline, onChange }: Props) => {
  return (
    <>
      {!disabled && (
        <ListElementsContainer
          hover={RemoveHover(listType)}
          background={RemoveBackground(listType)}
          switchBackground={SwitchBackground(listType)}
        >
          {listType === ListType.Rds &&
            GetFilteredList(listType, listItems, createLibraryType).map((element) => (
              <RDSElement
                key={element.name}
                category={element.name}
                rds={element.items}
                onChange={(key, data) => onChange(key, data)}
                defaultValue={createLibraryType?.rdsId}
              />
            ))}
          {ShowObjectBlock(listType, createLibraryType)
            ? GetFilteredList(listType, listItems, createLibraryType).map((element) => (
                <ObjectBlockElement
                  key={element.name}
                  name={element.name}
                  categoryId={element.id}
                  defaultTerminals={GetDefaultTerminals(element.id, createLibraryType)}
                  terminalTypes={element.items}
                  onChange={(key, data) => onChange(key, data)}
                />
              ))
            : listType === ListType.Terminals &&
              (IsTransport(createLibraryType.objectType) || IsInterface(createLibraryType.objectType))
            ? GetFilteredList(listType, listItems, createLibraryType).map((element) => (
                <TransportInterfaceElement
                  key={element.name}
                  categoryName={element.name}
                  terminalTypes={element.items}
                  defaultTerminal={GetDefaultTerminal(listType, createLibraryType, items)}
                  onChange={(key, data) => onChange(key, data)}
                />
              ))
            : listType === ListType.PredefinedAttributes &&
              GetFilteredList(listType, listItems, createLibraryType).map((element) => (
                <PredefinedLocationElement
                  key={element.key}
                  attributeName={element.key}
                  values={element.values}
                  isMultiSelect={element.isMultiSelect}
                  defaultValue={createLibraryType?.predefinedAttributes}
                  onChange={(key, data) => onChange(key, data)}
                />
              ))}
          {listType === ListType.LocationAttributes
            ? GetFilteredList(listType, listItems, createLibraryType).map((element) => (
                <LocationAttributeElement
                  key={element.id}
                  attribute={element}
                  onChange={(key, data) => onChange(key, data)}
                  defaultValue={createLibraryType?.attributeTypes}
                />
              ))
            : listType === ListType.ObjectAttributes &&
              GetFilteredList(listType, listItems, createLibraryType, discipline).map((element) => (
                <AttributeElement
                  key={element.discipline}
                  discipline={element.discipline}
                  attributes={element.items}
                  onChange={(key, data) => onChange(key, data)}
                  defaultValue={createLibraryType?.attributeTypes}
                />
              ))}
          {listType === ListType.SimpleTypes &&
            GetFilteredList(listType, listItems, createLibraryType).map((element) => (
              <SimpleTypeElement
                key={element.id}
                simpleType={element}
                onChange={(key, data) => onChange(key, data)}
                defaultValue={createLibraryType?.compositeTypes}
              />
            ))}
        </ListElementsContainer>
      )}
    </>
  );
};

export default ListContent;
