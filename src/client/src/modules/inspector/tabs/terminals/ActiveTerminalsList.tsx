import { Color } from "../../../../compLibrary";
import { Connector } from "../../../../models";
import { ListElement } from "../../styled";

interface Props {
  items: Connector[];
  selectedTerminalId: string;
  onItemSelect: (item: Connector) => void;
}

function ActiveTerminalsList({
  items,
  selectedTerminalId,
  onItemSelect,
}: Props) {
  return (
    <div>
      {items.map((item, i) => (
        <ListElement
          isSelected={item.id === selectedTerminalId}
          radius={0}
          onClick={() => onItemSelect(item)}
          index={i}
          key={i}
          color={i % 2 ? undefined : Color.LightPurple}
        >
          {item.name}
        </ListElement>
      ))}
    </div>
  );
}

export default ActiveTerminalsList;
