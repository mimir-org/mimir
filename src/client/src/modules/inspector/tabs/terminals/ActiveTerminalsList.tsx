import { Color } from "../../../../compLibrary";
import { ListElement } from "../../styled";

interface Props {
  items: any;
  onItemSelect: (item: any) => void;
}

function ActiveTerminalsList({ items, onItemSelect }: Props) {
  return (
    <div>
      {items.map((item, i) => (
        <ListElement
          onClick={() => onItemSelect(item)}
          index={i}
          key={i}
          color={i % 2 ? undefined : Color.ParamsLightPurple}
        >
          {item.name}
        </ListElement>
      ))}
    </div>
  );
}

export default ActiveTerminalsList;
