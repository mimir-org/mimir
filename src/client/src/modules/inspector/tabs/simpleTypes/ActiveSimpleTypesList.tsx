import { Color } from "../../../../compLibrary";
import { Composite } from "../../../../models";
import { TerminalsListElementWrapper, TerminalsCategoryListElement } from "../terminals/styled/activeTerminalList";

interface Props {
  simpleTypes: any[];
  onSelectSimpleType: (item: Composite) => void;
}

function ActiveSimpleTypesList({ simpleTypes, onSelectSimpleType }: Props) {
  return (
    <>
      {simpleTypes.map((type, i) => {
        return (
          <TerminalsListElementWrapper key={type.id}>
            <TerminalsCategoryListElement
              radius={0}
              onClick={() => onSelectSimpleType(type)}
              index={i}
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
