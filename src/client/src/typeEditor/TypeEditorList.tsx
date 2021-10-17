import { CreateLibraryType, Discipline } from "../models";
import { ListElementsContainer, ListLabel, ListWrapper } from "../compLibrary";
import {
  RDSElement,
  ObjectBlockElement,
  TransportInterfaceElement,
  PredefinedLocationElement,
  SimpleTypeElement,
  AttributeElement,
} from "./lists/";
import {
  GetListLabel,
  GetFilteredList,
  GetDefaultTerminal,
  GetDefaultTerminals,
  ShowObjectBlock,
  ShowBlockAttributes,
  RemoveHover,
  RemoveBackground,
  SwitchBackground,
  IsTransport,
  IsInterface,
  GetWidth,
} from "./helpers";

export enum ListType {
  Rds = 0,
  Terminals = 1,
  PredefinedAttributes = 2,
  ObjectAttributes = 3,
  LocationAttributes = 4,
  SimpleTypes = 5,
  Preview = 6,
}
interface Props {
  createLibraryType: CreateLibraryType;
  items: any[];
  discipline?: Discipline;
  disabled?: boolean;
  listType: ListType;
  onChange: Function;
}

export const TypeEditorList = ({ createLibraryType, items, discipline, disabled, listType, onChange }: Props) => {
  return (
    <ListWrapper wide={GetWidth(listType)} disabled={disabled}>
      <ListLabel>{GetListLabel(listType, createLibraryType)}</ListLabel>
      {!disabled && (
        <ListElementsContainer
          hover={RemoveHover(listType)}
          background={RemoveBackground(listType)}
          switchBackground={SwitchBackground(listType)}
        >
          {listType === ListType.Rds
            ? GetFilteredList(listType, items, createLibraryType).map((element) => (
                <RDSElement
                  key={element.name}
                  category={element.name}
                  rds={element.items}
                  onChange={(key, data) => onChange(key, data)}
                  defaultValue={createLibraryType?.rdsId}
                />
              ))
            : ShowObjectBlock(listType, createLibraryType)
            ? GetFilteredList(listType, items, createLibraryType).map((element) => (
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
            ? GetFilteredList(listType, items, createLibraryType).map((element) => (
                <TransportInterfaceElement
                  key={element.name}
                  categoryName={element.name}
                  terminalTypes={element.items}
                  defaultTerminal={GetDefaultTerminal(listType, createLibraryType, items)}
                  onChange={(key, data) => onChange(key, data)}
                />
              ))
            : listType === ListType.PredefinedAttributes
            ? GetFilteredList(listType, items, createLibraryType).map((element) => (
                <PredefinedLocationElement
                  key={element.key}
                  attributeName={element.key}
                  values={element.values}
                  isMultiSelect={element.isMultiSelect}
                  defaultValue={createLibraryType?.predefinedAttributes}
                  onChange={(key, data) => onChange(key, data)}
                />
              ))
            : ShowBlockAttributes(listType)
            ? GetFilteredList(listType, items, createLibraryType, discipline).map((element) => (
                <AttributeElement
                  key={element.discipline}
                  discipline={element.discipline}
                  attributes={element.items}
                  onChange={(key, data) => onChange(key, data)}
                  defaultValue={createLibraryType?.attributeTypes}
                />
              ))
            : listType === ListType.SimpleTypes
            ? GetFilteredList(listType, items, createLibraryType).map((element) => (
                <SimpleTypeElement
                  key={element.id}
                  simpleType={element}
                  onChange={(key, data) => onChange(key, data)}
                  defaultValue={createLibraryType?.compositeTypes}
                />
              ))
            : null}
        </ListElementsContainer>
      )}
    </ListWrapper>
  );
};

export default TypeEditorList;
