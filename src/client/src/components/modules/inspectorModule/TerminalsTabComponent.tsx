import styled from "styled-components";
import { ActiveTerminalTypeList, AttributesContainer } from "./helpers";
import { Attribute } from "../../../models";
import { IsTransportTerminal } from "../../flow/helpers/common";
import { TextResources } from "../../../assets/text";

// Migth be used later:
// import { ConnectorAttributesList } from "./helpers";
// import { changeConnectorAttributeValue } from "../../../redux/store/project/actions";
interface ConnectorAttribute {
  id: string;
  name: string;
  attributes: Attribute[];
}

/*
Might be used later:
const AttributesWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px;
    height: 160px;
    width: 250px;
`;*/
const TerminalsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 550px;
`;
const ListWrapper = styled.div`
  display: flex;
`;

const TerminalsTabComponent = ({ node }): any => {
  /*
  Might be used later:
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
  */

  let activeConnectors = [];
  let connectorAttributes: ConnectorAttribute[] = [];

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
  }

  return (
    <ListWrapper>
      <TerminalsWrapper>
        <ActiveTerminalTypeList
          terminals={node?.connectors?.filter((x) => x.terminalCategoryId)}
          title={TextResources.Inspector_Relations_All_Terminal_Types}
          onElementClick={() => null}
        />
        <ActiveTerminalTypeList
          terminals={activeConnectors}
          title={TextResources.Inspector_Relations_Active_Terminal_Types}
          onElementClick={() => null}
        />
      </TerminalsWrapper>
      <AttributesContainer
        attributes={connectorAttributes}
        title={TextResources.Inspector_Relations_Connector_Attributes}
      />
      {
        //TODO show attributes and other fields from Arjun's design on Figma
        /* <AttributesWrapper>
        <ConnectorAttributesList
        connectorAttrs={connectorAttributes}
        handleChange={handleOnConnectorChange}
        ></ConnectorAttributesList>
      </AttributesWrapper> */
      }
    </ListWrapper>
  );
};

export default TerminalsTabComponent;
