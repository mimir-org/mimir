import { Attribute, Node } from "../../../models/project";
import { TabRow } from "../../../componentLibrary/box/inspector";
import { useDispatch } from "react-redux";
import { IsTransportTerminal } from "../../flow/helpers";
import { CalculateRows, SetConnectorColumn, SetNodeColumn } from "./helpers";
import {
  changeAttributeValue,
  changeConnectorAttributeValue,
} from "../../../redux/store/project/actions";

interface Props {
  node: Node;
  index?: number;
}

interface ConnectorAttribute {
  id: string;
  name: string;
  attributes: Attribute[];
}

const TabContent = ({ node, index }: Props) => {
  const dispatch = useDispatch();

  let connectorAttributes: ConnectorAttribute[] = [];
  let nodeAttributes: Attribute[] = [];

  if (node) {
    const tempAttributes: ConnectorAttribute[] = [];

    node.connectors?.forEach((connector) => {
      if (IsTransportTerminal(connector)) {
        const data = {
          id: connector.id,
          name: connector.name + " " + connector.type,
          attributes: connector.attributes,
        } as ConnectorAttribute;
        tempAttributes.push(data);
      }
    });

    connectorAttributes = tempAttributes;
    nodeAttributes = node.attributes;
  }

  const handleOnNodeChange = (id: string, value: string, unit: string) => {
    dispatch(changeAttributeValue(id, value, unit, node.id));
  };

  const handleOnConnectorChange = (
    id: string,
    value: string,
    unit: string,
    connectorId: string
  ) => {
    dispatch(
      changeConnectorAttributeValue(id, value, unit, node.id, connectorId)
    );
  };
  const rows = CalculateRows(nodeAttributes.length);
  let count = rows;

  return (
    <>
      {/* TODO: Refactor, rewrite sorting function?*/}
      {index === 1 && (
        <TabRow>
          <SetNodeColumn
            list={nodeAttributes.slice(0, count)}
            handleChange={handleOnNodeChange}
          ></SetNodeColumn>
          <SetNodeColumn
            list={nodeAttributes.slice(count, rows + count)}
            handleChange={handleOnNodeChange}
          ></SetNodeColumn>
          <SetNodeColumn
            list={nodeAttributes.slice(rows + count, rows + (count += rows))}
            handleChange={handleOnNodeChange}
          ></SetNodeColumn>
          <SetNodeColumn
            list={nodeAttributes.slice(rows + count, rows + (count += rows))}
            handleChange={handleOnNodeChange}
          ></SetNodeColumn>
          <SetNodeColumn
            list={nodeAttributes.slice(rows + count, rows + (count += rows))}
            handleChange={handleOnNodeChange}
          ></SetNodeColumn>
          <SetNodeColumn
            list={nodeAttributes.slice(rows + count, nodeAttributes.length)}
            handleChange={handleOnNodeChange}
          ></SetNodeColumn>
        </TabRow>
      )}
      {/* TODO: Return max 6 columns, handle all rows*/}
      {index === 2 && (
        <TabRow>
          <SetConnectorColumn
            list={connectorAttributes}
            handleChange={handleOnConnectorChange}
          ></SetConnectorColumn>
        </TabRow>
      )}
    </>
  );
};

export default TabContent;
