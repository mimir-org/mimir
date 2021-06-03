import { Attribute, Node } from "../../../models/project";
import { TabRow } from "../../../componentLibrary/box/inspector";
import { useDispatch } from "react-redux";
import { IsTransportTerminal } from "../../flow/helpers";
import { CalculateRows, SetConnectorColumn, SetNodeColumn } from "./helpers";
import { Input, InputBox, Select, AttributeField } from "../../../componentLibrary";
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
    nodeAttributes = node.attributes.concat(node.attributes);
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
          
          {nodeAttributes?.map((attr) => (
            <AttributeField>
              <div key={attr.id}>
                <div>{attr.key}</div>
                
                <InputBox>
                  <Input
                    value={attr.value ?? ""}
                    onChange={(e: any) =>
                      handleOnNodeChange(attr.id, e.target.value, attr.unit)
                    }
                    inputType="tech"
                  />
                  <Select
                    value={attr.unit}
                    onChange={(e: any) =>
                      handleOnNodeChange(attr.id, attr.value, e.target.value)
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
            </AttributeField>
          ))}
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
