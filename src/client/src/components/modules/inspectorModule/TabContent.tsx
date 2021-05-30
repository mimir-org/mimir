import { Attribute, Node } from "../../../models/project";
import { TabColumn, TabRow } from "./styled";
import { Input, Select, InputBox } from "../../../componentLibrary";
import { useDispatch } from "react-redux";
import { CreateId, IsTransportTerminal } from "../../flow/helpers";
import { CalculateRows, SetColumn } from "./helpers";
import {
  changeAttributeValue,
  changeConnectorAttributeValue,
} from "../../../redux/store/project/actions";

interface Props {
  node: Node;
}

interface ConnectorAttribute {
  id: string;
  name: string;
  attributes: Attribute[];
}

const TabContent = ({ node }: Props) => {
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
  if (count === 2 && nodeAttributes.length < 11) count = 1;

  return (
    <>
      <TabRow>
        <SetColumn
          list={nodeAttributes.slice(0, count)}
          handleChange={handleOnNodeChange}
        ></SetColumn>
        <SetColumn
          list={nodeAttributes.slice(count, rows + count)}
          handleChange={handleOnNodeChange}
        ></SetColumn>
        <SetColumn
          list={nodeAttributes.slice(rows + count, rows + (count += rows))}
          handleChange={handleOnNodeChange}
        ></SetColumn>
        <SetColumn
          list={nodeAttributes.slice(rows + count, rows + (count += rows))}
          handleChange={handleOnNodeChange}
        ></SetColumn>
        <SetColumn
          list={nodeAttributes.slice(rows + count, rows + (count += rows))}
          handleChange={handleOnNodeChange}
        ></SetColumn>
        <SetColumn
          list={nodeAttributes.slice(rows + count, rows + (count += rows))}
          handleChange={handleOnNodeChange}
        ></SetColumn>
      </TabRow>
      <TabRow>
        {connectorAttributes?.map((connector: ConnectorAttribute) => (
          <TabColumn key={connector.id} fontSize="10">
            {connector?.attributes.map((attr: Attribute) => (
              <div key={attr.id}>
                <div>
                  {attr.key} {connector.name}
                </div>
                <InputBox>
                  <Input
                    value={attr.value ?? ""}
                    onChange={(e: any) =>
                      handleOnConnectorChange(
                        attr.id,
                        e.target.value,
                        attr.unit,
                        attr.connectorId
                      )
                    }
                    inputType="tech"
                  />
                  <Select
                    width="200"
                    marginLeft="4"
                    value={attr.unit}
                    onChange={(e: any) =>
                      handleOnConnectorChange(
                        attr.id,
                        attr.value,
                        e.target.value,
                        attr.connectorId
                      )
                    }
                  >
                    <option value={"NotSet"}>NotSet</option>
                    {attr.units.map((unit) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </Select>
                </InputBox>
              </div>
            ))}
          </TabColumn>
        ))}
      </TabRow>
    </>
  );
};

export default TabContent;
