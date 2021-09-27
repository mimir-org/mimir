import { Connector, Edge } from "../../../../models";
import { ListElement } from "../../styled";
import { RelationsColumn, RelationsHeader, TerminalList } from "./styled";

type RelationItem = Connector | Edge;

interface Props<T> {
  items: T[];
  label: string;
  getName: (item: T) => string;
  getColor: (item: T) => string;
  onClick: (item: T) => void;
}

const RelationsContent = <T extends RelationItem>({
  items,
  label,
  getName,
  getColor,
  onClick,
}: Props<T>) => {
  return (
    <RelationsColumn>
      <RelationsHeader>{label}</RelationsHeader>
      <TerminalList hasItems={items.length > 0}>
        {items?.map((item, i) => {
          return (
            <ListElement
              onClick={() => onClick(item)}
              index={i}
              key={item.id}
              color={getColor(item)}
            >
              {getName(item)}
            </ListElement>
          );
        })}
      </TerminalList>
    </RelationsColumn>
  );
};

export default RelationsContent;
