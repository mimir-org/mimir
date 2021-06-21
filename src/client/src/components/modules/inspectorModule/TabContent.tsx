import { Attribute, Node } from "../../../models";
import { TabRow } from "../../../compLibrary/box/inspector";
import { useDispatch } from "react-redux";
import { IsTransportTerminal, CreateId } from "../../flow/helpers/common";
// import { CalculateRows, ConnectorAttributesList } from "./helpers";
import { Input, InputBox, Select, AttributeField } from "../../../compLibrary";
import { RelationTabComponent, CommentsTabComponent } from ".";
import { InputWrapper } from "./styled";
import { TerminalsTabComponent } from "./";
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

  let activeConnectors = [];
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
    activeConnectors = node.connectors?.filter((con) => con.visible);
    connectorAttributes = tempAttributes;
    nodeAttributes = node.attributes;
  }

  const handleOnNodeChange = (id: string, value: string, unit: any) => {
    dispatch(changeAttributeValue(id, value, unit, node.id));
  };

  const handleOnConnectorChange = (
    id: string,
    value: string,
    unit: any,
    connectorId: string
  ) => {
    dispatch(
      changeConnectorAttributeValue(id, value, unit, node.id, connectorId)
    );
  };
  //   const rows = CalculateRows(nodeAttributes.length);
  //   let count = rows;

  return (
    <>
      {/* TODO: Refactor, rewrite sorting function?
          NOIE: Currently not using SetNodeColumn.tsx or CalculateRows() anymore. Should it be removed?
      */}
      {index === 1 && (
        <TabRow>
          {nodeAttributes?.map((attr) => {
            let inputFieldWidth = (attr.value?.length ?? 1) * 3 + 10;
            //inputFieldWidth = (inputFieldWidth <= 10) ? 10 : inputFieldWidth;
            return (
              <AttributeField key={CreateId()}>
                <div>{attr.key}</div>
                <InputBox>
                  <InputWrapper
                    width={inputFieldWidth + "%"}
                    rightMargin={"4px"}
                  >
                    <Input
                      value={attr.value ?? ""}
                      onChange={(e: any) =>
                        handleOnNodeChange(attr.id, e.target.value, attr.unit)
                      }
                      inputType="tech"
                    />
                  </InputWrapper>
                  <InputWrapper width={100 - inputFieldWidth + "%"}>
                    <Select
                      value={attr.unit}
                      onChange={(e: any) =>
                        handleOnNodeChange(attr.id, attr.value, e.target.value)
                      }
                    >
                      <option value={"NotSet"}>NotSet</option>
                      {attr.units?.map((unit) => (
                        <option value={unit + "langt navn"}>{unit}</option>
                      ))}
                    </Select>
                  </InputWrapper>
                </InputBox>
              </AttributeField>
            );
          })}
        </TabRow>
      )}
      {/* TODO: Return max 6 columns, handle all rows. Wait for Arjun's design first.*/}
      {index === 2 && (
        <>
          <TerminalsTabComponent
            connectorAttrs={connectorAttributes}
            allConnectors={node?.connectors}
            visibleConnectors={activeConnectors}
            handleChange={handleOnConnectorChange}
          />
        </>
      )}

      {index === 3 && <RelationTabComponent node={node} />}
      {index === 4 && <CommentsTabComponent node={node} />}
    </>
  );
};

export default TabContent;
