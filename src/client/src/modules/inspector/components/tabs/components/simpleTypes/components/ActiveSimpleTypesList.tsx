import { Simple } from "@mimirorg/modelbuilder-types";
import { TerminalsCategoryElement } from "../../shared/styled/TerminalsCategoryElement";
import { TerminalsListElementWrapper } from "../../shared/styled/TerminalsListElementWrapper";

interface Props {
  simpleTypes: Simple[];
  selectedSimpleTypeId: string;
  onSelect: (item: Simple) => void;
}

export const ActiveSimpleTypesList = ({ simpleTypes, selectedSimpleTypeId, onSelect }: Props) => (
  <>
    {simpleTypes.map((type, i) => {
      return (
        <TerminalsListElementWrapper key={type.id}>
          <TerminalsCategoryElement
            radius={0}
            selected={selectedSimpleTypeId === type.id}
            onClick={() => onSelect(type)}
            index={i}
          >
            {type.name}
          </TerminalsCategoryElement>
        </TerminalsListElementWrapper>
      );
    })}
  </>
);
