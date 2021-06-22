import { AttributesList } from "../typeEditorModule"
import {ActiveTerminalTypeList, AttributesContainer} from "./helpers"
import { useDispatch } from "react-redux";
import { Attribute } from "../../../models";
import {ConnectorAttributesList} from "./helpers"
import { IsTransportTerminal, CreateId } from "../../flow/helpers/common";
import styled from "styled-components";
import {
  
  changeConnectorAttributeValue,
} from "../../../redux/store/project/actions";
import textResources from "../../../assets/textResources/textResources";
interface ConnectorAttribute {
  id: string;
  name: string;
  attributes: Attribute[];
}

//AttributesWrapper currently not in use, but will be
const AttributesWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px;
    height: 160px;
    width: 250px;
`;
const TerminalsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 550px;
`;
const ListWrapper = styled.div`
    display: flex;
`
const TerminalsTabComponent = ({ node }): any => {
  const dispatch = useDispatch();
  
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
    activeConnectors = node.connectors?.filter(con => con.visible);
    connectorAttributes = tempAttributes;
  }

  return (
    <>
    <ListWrapper>
      <TerminalsWrapper>
        <ActiveTerminalTypeList
        terminals={node?.connectors}
        title={textResources.Inspector_Relations_All_Terminal_Types}
        onElementClick={()=>{}}
        />
        <ActiveTerminalTypeList
        terminals={activeConnectors}
        title={textResources.Inspector_Relations_Active_Terminal_Types}
        onElementClick={()=>{}}
        />
      </TerminalsWrapper>
      <AttributesContainer 
      attributes={connectorAttributes}
      title="Connector attributes"
      />
      {
      //TODO show attributes and other fields from Arjun's design on Figma
      /* <AttributesWrapper>
        <ConnectorAttributesList
        connectorAttrs={connectorAttributes}
        handleChange={handleOnConnectorChange}
        ></ConnectorAttributesList>
      </AttributesWrapper> */}
    </ListWrapper>
    </>
  )
};

export default TerminalsTabComponent;
