import { Attribute, Node } from "../../../models/project";
import { TabColumn } from "./styled";
import { Input, Select, InputBox } from "../../../componentLibrary";
import { useDispatch } from "react-redux";
import { IsTransportTerminal } from "../../flow/helpers";
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

  const handleOnNodeAttributeChange = (
    id: string,
    value: string,
    unit: string
  ) => {
    dispatch(changeAttributeValue(id, value, unit, node.id));
  };

  const handleOnConnectorAttributeChange = (
    id: string,
    value: string,
    unit: string,
    connectorId: string
  ) => {
    dispatch(
      changeConnectorAttributeValue(id, value, unit, node.id, connectorId)
    );
  };

  return (
    <>
      {" "}
      <div>
        {nodeAttributes?.map((attr) => (
          <TabColumn key={attr.id} fontSize="10">
            <div>
              <div>{attr.key}</div>
              <InputBox>
                <Input
                  width="50"
                  value={attr.value ?? ""}
                  onChange={(e: any) =>
                    handleOnNodeAttributeChange(
                      attr.id,
                      e.target.value,
                      attr.unit
                    )
                  }
                  inputType=""
                />
                <Select
                  marginLeft="4"
                  width="120"
                  value={attr.unit}
                  onChange={(e: any) =>
                    handleOnNodeAttributeChange(
                      attr.id,
                      attr.value,
                      e.target.value
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
          </TabColumn>
        ))}{" "}
      </div>
      {connectorAttributes?.map((connector: ConnectorAttribute) => (
        <TabColumn key={connector.id} fontSize="10">
          {connector?.attributes.map((attr: Attribute) => (
            <div key={attr.id}>
              <div>
                {attr.key} {connector.name}
              </div>
              <InputBox>
                <Input
                  width="50"
                  value={attr.value ?? ""}
                  onChange={(e: any) =>
                    handleOnConnectorAttributeChange(
                      attr.id,
                      e.target.value,
                      attr.unit,
                      attr.connectorId
                    )
                  }
                  inputType=""
                />
                <Select
                  marginLeft="4"
                  width="120"
                  value={attr.unit}
                  onChange={(e: any) =>
                    handleOnConnectorAttributeChange(
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
    </>
  );
};

export default TabContent;
