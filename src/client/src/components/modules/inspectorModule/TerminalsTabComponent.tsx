import { AttributesList } from "../typeEditorModule"
import {ActiveTerminalTypeList, AttributesContainer} from "./helpers"
import { Input, InputBox, Select } from "../../../compLibrary";
import { TabColumn } from "../../../compLibrary/box/inspector";
import { Attribute } from "../../../models";
import {ConnectorAttributesList} from "./helpers"
import styled from "styled-components";
interface ConnectorAttribute {
  id: string;
  name: string;
  attributes: Attribute[];
}
interface Props {
  connectorAttrs: ConnectorAttribute[];
  handleChange: any;
  visibleConnectors: any;
  allConnectors: any;
}
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
const TerminalsTabComponent = ({ allConnectors, connectorAttrs, handleChange, visibleConnectors }: Props): any => {
 
  return (
    <>
    <ListWrapper>

    <ActiveTerminalTypeList
    terminals={allConnectors}
    title="All available Terminal Types"
    onElementClick={()=>{}}
    />
    <ActiveTerminalTypeList
    terminals={visibleConnectors}
    title="Active Terminal Types"
    onElementClick={()=>{}}
    />
    <AttributesContainer 
    attributes={connectorAttrs}
    />
    {
    //TODO show attributes and other fields from Arjun's design on Figma
    
    /* <AttributesWrapper>
      <ConnectorAttributesList
      connectorAttrs={connectorAttrs}
      handleChange={handleChange}
      ></ConnectorAttributesList>
    </AttributesWrapper> */}
    </ListWrapper>
    </>
  )
};

export default TerminalsTabComponent;
