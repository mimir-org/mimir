import {
  ListElementsContainer,
  ListLabel,
  ListWrapper,
} from "../../../compLibrary";
import {
  CreateLibraryType,
  TerminalType,
  TerminalTypeItem,
} from "../../../models";
import {
  RDSElement,
  ObjectBlockElement,
  TransportInterfaceElement,
  PredefinedLocationElement,
  AttributeElement,
} from "./lists/";
import {
  GetListLabel,
  GetFilteredRdsList,
  GetFilteredTerminalsList,
  GetFilteredAttributesList,
  IsObjectBlock,
  IsTransport,
  IsInterface,
} from "./helpers";

export enum ListType {
  Rds = 0,
  Terminals = 1,
  PredefinedAttributes = 2,
  ObjectAttributes = 3,
  LocationAttributes = 4,
  Preview = 5,
}

interface Props {
  createLibraryType: CreateLibraryType;
  items: any[];
  disabled?: boolean;
  listType: ListType;
  onChange: Function;
}

export const TypeEditorList = ({
  createLibraryType,
  items,
  disabled,
  listType,
  onChange,
}: Props) => {
  const filteredList = (): any[] => {
    switch (listType) {
      case ListType.Rds:
        return GetFilteredRdsList(items, createLibraryType.aspect);
      case ListType.Terminals:
        return GetFilteredTerminalsList(items);
      case ListType.PredefinedAttributes:
        return items;
      case ListType.ObjectAttributes:
        return GetFilteredAttributesList(items, createLibraryType.aspect);
      case ListType.LocationAttributes:
        return GetFilteredAttributesList(items, createLibraryType.aspect);
      default:
        return [] as any[];
    }
  };

  const defaultTerminal = (terminalTypeId: string): TerminalType => {
    let terminal;
    if (ListType.Terminals && createLibraryType?.terminalTypeId) {
      GetFilteredTerminalsList(items)?.forEach((cat) => {
        cat.items.forEach((item) => {
          if (item.id === terminalTypeId) {
            terminal = item;
          }
        });
      });
    }
    return terminal;
  };

  const defaultTerminals = (categoryId: string): TerminalTypeItem[] => {
    return createLibraryType.terminalTypes?.filter(
      (x) => x.categoryId === categoryId
    );
  };

  const removeBackground = (): boolean => {
    if (
      listType === ListType.Terminals ||
      listType === ListType.PredefinedAttributes
    ) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <ListWrapper flex={1} disabled={disabled}>
      <ListLabel>{GetListLabel(listType)}</ListLabel>
      {!disabled && (
        <ListElementsContainer background={removeBackground()}>
          {listType === ListType.Rds
            ? filteredList().map((element) => (
                <RDSElement
                  key={element.id}
                  id={element.id}
                  name={element.name}
                  onChange={(key, data) => onChange(key, data)}
                  defaultValue={createLibraryType?.rdsId}
                />
              ))
            : listType === ListType.Terminals &&
              IsObjectBlock(createLibraryType.objectType)
            ? filteredList().map((element) => (
                <ObjectBlockElement
                  key={element.name}
                  name={element.name}
                  categoryId={element.id}
                  defaultTerminals={defaultTerminals(element.id)}
                  terminalTypes={element.items}
                  onChange={(key, data, categoryId, row) =>
                    onChange(key, data, categoryId, row)
                  }
                />
              ))
            : listType === ListType.Terminals &&
              (IsTransport(createLibraryType.objectType) ||
                IsInterface(createLibraryType.objectType))
            ? filteredList().map((element) => (
                <TransportInterfaceElement
                  key={element.name}
                  categoryName={element.name}
                  terminalTypes={element.items}
                  defaultTerminal={defaultTerminal(
                    createLibraryType?.terminalTypeId
                  )}
                  onChange={(key, data) => onChange(key, data)}
                />
              ))
            : listType === ListType.PredefinedAttributes
            ? filteredList().map((element) => (
                <PredefinedLocationElement
                  key={element.key}
                  attributeName={element.key}
                  values={element.values}
                  isMultiSelect={element.isMultiSelect}
                  defaultValue={createLibraryType?.predefinedAttributes}
                  onChange={(key, data) => onChange(key, data)}
                />
              ))
            : listType === ListType.ObjectAttributes ||
              listType === ListType.LocationAttributes
            ? filteredList().map((element) => (
                <AttributeElement
                  key={element.id}
                  attribute={element}
                  onChange={(key, data) => onChange(key, data)}
                  defaultValue={createLibraryType.attributeTypes}
                />
              ))
            : null}
        </ListElementsContainer>
      )}
    </ListWrapper>
  );
};

export default TypeEditorList;
