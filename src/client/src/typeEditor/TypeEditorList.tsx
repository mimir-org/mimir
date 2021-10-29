import { useState } from "react";
import { ListWrapper } from "../compLibrary";
import { ListContent, ListSearch } from "./lists/";
import { GetListLabel, GetWidth } from "./helpers";
import {
  CreateLibraryType,
  Discipline,
  Rds,
  PredefinedAttribute,
  AttributeType,
  CompositeType,
  TerminalTypeDict,
} from "../models";

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
  items: Rds[] | TerminalTypeDict | AttributeType[] | CompositeType[] | PredefinedAttribute[];
  discipline?: Discipline;
  disabled?: boolean;
  listType: ListType;
  onChange: Function;
}
/**
 * A generic list-component in Type editor
 * @returns a visual Type Editor list
 */
export const TypeEditorList = ({ createLibraryType, items, discipline, disabled, listType, onChange }: Props) => {
  const [filteredListItems, setListItems] = useState(items);
  return (
    <ListWrapper wide={GetWidth(listType)} disabled={disabled}>
      <ListSearch
        listType={listType}
        placeHolder={GetListLabel(listType, createLibraryType)}
        list={items}
        setlistItems={setListItems}
      />
      <ListContent
        disabled={disabled}
        listType={listType}
        items={items}
        listItems={filteredListItems}
        createLibraryType={createLibraryType}
        discipline={discipline}
        onChange={(key, data) => onChange(key, data)}
      />
    </ListWrapper>
  );
};

export default TypeEditorList;
