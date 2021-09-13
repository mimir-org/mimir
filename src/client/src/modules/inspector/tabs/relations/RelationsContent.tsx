import { RightArrowIcon } from "../../../../assets/icons/common";
import { Connector, ConnectorType } from "../../../../models";
import { GetRelationColor } from "../../helpers";
import { ListElement } from "../../styled";
import { RelationsColumn, RelationsHeader, TerminalList } from "./styled";

interface Props {
  terminals: Connector[];
  label: string;
}

const RelationsContent = ({ terminals, label }: Props) => {
  return (
    <RelationsColumn>
      <RelationsHeader>{label}</RelationsHeader>
      <TerminalList>
        {terminals?.map((conn, i) => {
          return (
            <ListElement
              onClick={() => null}
              index={i}
              key={conn.id}
              color={GetRelationColor(conn)}
            >
              {conn.name} {ConnectorType[conn.type]}
              <img src={RightArrowIcon} alt="icon" className="icon" />
            </ListElement>
          );
        })}
      </TerminalList>
    </RelationsColumn>
  );
};

export default RelationsContent;
