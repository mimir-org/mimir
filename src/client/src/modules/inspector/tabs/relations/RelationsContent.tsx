import { Connector, Edge, Node } from "../../../../models";
import { ListElement } from "../../styled";
import { RelationsColumn, RelationsHeader, TerminalList } from "./styled";

type RelationItem = Node | Connector | Edge;

interface Props<T> {
  items: T[];
  label: string;
  getName: (item: T) => string;
  getColor: (item: T, index: number) => string;
  onClick: (item: T) => void;
}

const RelationsContent = <T extends RelationItem>({ items, label, getName, getColor, onClick }: Props<T>) => (
  <RelationsColumn>
    <RelationsHeader>{label}</RelationsHeader>
    <TerminalList hasItems={items.length > 0}>
      {items?.map((item, i) => {
        return (
          <ListElement onClick={() => onClick(item)} key={item.id} color={getColor(item, i)}>
            {getName(item)}
          </ListElement>
        );
      })}
    </TerminalList>
  </RelationsColumn>
);

export default RelationsContent;
