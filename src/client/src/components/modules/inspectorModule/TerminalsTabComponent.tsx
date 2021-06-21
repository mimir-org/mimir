import { AttributesList } from "../typeEditorModule"
import {ActiveTerminalTypeList, AttributesContainer} from "./helpers"
import { useDispatch } from "react-redux";
import { Input, InputBox, Select } from "../../../compLibrary";
import { TabColumn } from "../../../compLibrary/box/inspector";
import { Attribute } from "../../../models";
import {ConnectorAttributesList} from "./helpers"
import { IsTransportTerminal, CreateId } from "../../flow/helpers/common";
import styled from "styled-components";
import {
  changeAttributeValue,
  changeConnectorAttributeValue,
} from "../../../redux/store/project/actions";
interface ConnectorAttribute {
  id: string;
  name: string;
  attributes: Attribute[];
}

//AttributesWrapper currently not in use, but will be
const AttributesWrapper = styled.div`
    //border: red solid 1px;
    display: flex;
    flex-direction: column;
    margin: 10px;
    height: 160px;
    width: 250px;
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

      <ActiveTerminalTypeList
      terminals={node?.connectors}
      title="All available Terminal Types"
      onElementClick={()=>{}}
      />
      <ActiveTerminalTypeList
      terminals={activeConnectors}
      title="Active Terminal Types"
      onElementClick={()=>{}}
      />
      <AttributesContainer 
      attributes={connectorAttributes}
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
