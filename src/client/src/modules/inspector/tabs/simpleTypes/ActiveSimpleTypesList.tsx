import { Color } from "../../../../compLibrary";
import { CompositeLikeItem } from "../../types";
import { TerminalsListElementWrapper, TerminalsCategoryListElement } from "../terminals/styled/activeTerminalList";

interface Props {
  simpleTypes: CompositeLikeItem[];
  selectedSimpleTypeId: string;
  onSelect: (item: CompositeLikeItem) => void;
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
              color={i % 2 ? undefined : Color.LightPurple}
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
