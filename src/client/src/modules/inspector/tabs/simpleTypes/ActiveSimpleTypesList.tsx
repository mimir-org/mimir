import { Color } from "../../../../compLibrary/colors";
import { SimpleLikeItem } from "../../types";
import { TerminalsListElementWrapper, TerminalsCategoryListElement } from "../terminals/styled/activeTerminalList";

interface Props {
  simpleTypes: SimpleLikeItem[];
  selectedSimpleTypeId: string;
  onSelect: (item: SimpleLikeItem) => void;
}

function ActiveSimpleTypesList({ simpleTypes, selectedSimpleTypeId, onSelect }: Props) {
  return (
    <>
      {simpleTypes.map((type, i) => {
        return (
          <TerminalsListElementWrapper key={type.id}>
            <TerminalsCategoryListElement
              radius={0}
              isSelected={selectedSimpleTypeId === type.id}
              onClick={() => onSelect(type)}
              color={i % 2 ? undefined : Color.PurpleLight}
            >
              {type.name}
            </TerminalsCategoryListElement>
          </TerminalsListElementWrapper>
        );
      })}
    </>
  );
}

export default ActiveSimpleTypesList;
