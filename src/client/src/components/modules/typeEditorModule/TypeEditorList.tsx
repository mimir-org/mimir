import {
  ListElementsContainer,
  ListLabel,
  ListWrapper,
} from "../../../compLibrary";
import { TextResources } from "../../../assets/text";
import { Aspect, CreateLibraryType } from "../../../models";
import {
  RDSListElement,
  TerminalsListElement,
  PredefinedAttributesListElement,
} from "./lists/";
import {
  GetListLabel,
  GetFilteredRdsList,
  GetFilteredTerminalsList,
} from "./helpers";

export enum ListType {
  Rds = 0,
  Terminals = 1,
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
        console.log(GetFilteredTerminalsList(items));
        return GetFilteredTerminalsList(items);
      default:
        return [] as any[];
    }
  };

  return (
    <ListWrapper flex={0.7} disabled={disabled}>
      <ListLabel>{GetListLabel(listType)}</ListLabel>
      {!disabled && (
        <ListElementsContainer>
          {listType === ListType.Rds
            ? filteredList().map((element) => (
                <RDSListElement
                  key={element.id}
                  id={element.id}
                  name={element.name}
                  onChange={(key, data) => onChange(key, data)}
                  defaultValue={createLibraryType.rdsId}
                />
              ))
            : listType === ListType.Terminals
            ? filteredList().map((element) => (
                <TerminalsListElement
                  key={element.name}
                  name={element.name}
                  terminalTypes={element.items}
                  onChange={(key, data) => onChange(key, data)}
                  //   defaultValue={3}
                />
              ))
            : null}
        </ListElementsContainer>
      )}
    </ListWrapper>
  );
};

export default TypeEditorList;
