import { Color } from "../../../../../../../compLibrary/colors";
import { SimpleLikeItem } from "../../../../../types";
import { TerminalsCategoryListElement } from "../../shared/styled/TerminalsCategoryListElement";
import { TerminalsListElementWrapper } from "../../shared/styled/TerminalsListElementWrapper";

interface Props {
  simpleTypes: SimpleLikeItem[];
  selectedSimpleTypeId: string;
  onSelect: (item: SimpleLikeItem) => void;
}

export const ActiveSimpleTypesList = ({ simpleTypes, selectedSimpleTypeId, onSelect }: Props) => (
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
