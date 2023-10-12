import { AspectObject, Connection, ConnectionRelation, Connector } from "lib";
import {
  RelationsContainer,
  RelationsHeader,
  RelationsTerminalList,
  RelationsTerminalListElement,
} from "./RelationsContent.styled";

type RelationItem = AspectObject | ConnectionRelation | Connector | Connection;

interface Props<T> {
  items: T[];
  label: string;
  getName: (item: T) => string;
  getColor: (item: T, index: number) => string;
  onClick: (item: T) => void;
}

export const RelationsContent = <T extends RelationItem>({ items, label, getName, getColor, onClick }: Props<T>) => (
  <RelationsContainer>
    <RelationsHeader>{label}</RelationsHeader>
    <RelationsTerminalList hasItems={items.length > 0}>
      {items?.map((item, i) => {
        return (
          <RelationsTerminalListElement onClick={() => onClick(item)} key={item.id} color={getColor(item, i)}>
            {getName(item)}
          </RelationsTerminalListElement>
        );
      })}
    </RelationsTerminalList>
  </RelationsContainer>
);
