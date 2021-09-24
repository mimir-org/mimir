import { ActiveTerminalTypeList, AttributesContainer } from "../../helpers";
import { Attribute, ConnectorType, Node } from "../../../../models";
import { IsTransportTerminal } from "../../../../components/flow/helpers/common";
import { TextResources } from "../../../../assets/text";
import { ListWrapper, TerminalsWrapper } from "../../styled";

interface Props {
  node: Node;
}

interface ConnectorAttribute {
  id: string;
  name: string;
  attributes: Attribute[];
}

const TerminalsComponent = ({ node }: Props) => {
  let activeConnectors = [];
  let connectorAttributes: ConnectorAttribute[] = [];

  if (node) {
    const tempAttributes: ConnectorAttribute[] = [];

    node.connectors?.forEach((conn) => {
      if (IsTransportTerminal(conn)) {
        const data = {
          id: conn.id,
          name: conn.name + " " + ConnectorType[conn.type],
          attributes: conn.attributes,
        } as ConnectorAttribute;
        tempAttributes.push(data);
      }
    });
    activeConnectors = node.connectors?.filter((conn) => conn.visible);
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

export default TerminalsComponent;

// Migth be used later:
// import { ConnectorAttributesList } from "./helpers";
// import { changeConnectorAttributeValue } from "../../../redux/store/project/actions";

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
