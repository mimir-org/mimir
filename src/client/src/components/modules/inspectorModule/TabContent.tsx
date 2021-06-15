import { Attribute, Node } from "../../../models/project";
import { TabRow } from "../../../componentLibrary/box/inspector";
import { useDispatch } from "react-redux";
import { IsTransportTerminal, CreateId } from "../../flow/helpers/common";
import { CalculateRows, SetConnectorColumn } from "./helpers";
import { Input, InputBox, Select, AttributeField } from "../../../componentLibrary";
import { RelationTabComponent } from ".";
import {
  changeAttributeValue,
  changeConnectorAttributeValue,
} from "../../../redux/store/project/actions";
import {
  InputWrapper,
} from "./styled";
import { changeSelectedAspect } from "../../../redux/store/typeEditor/actions";
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

  function goToAspect(aspect){
    console.log(aspect)
  }

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
                      width={inputFieldWidth + '%'}
                      rightMargin={"4px"}>
                      <Input
                      value={attr.value ?? ""}
                      onChange={(e: any) =>
                        handleOnNodeChange(attr.id, e.target.value, attr.unit)
                      }
                      inputType="tech"
                      />
                    </InputWrapper>
                    <InputWrapper
                      width={(100 - inputFieldWidth) + '%'}>
                      <Select
                        value={attr.unit}
                        onChange={(e: any) =>
                          handleOnNodeChange(attr.id, attr.value, e.target.value)
                        }
                        >
                        <option value={"NotSet"}>NotSet</option>
                        {attr.units.map((unit) => (
                          <option key={unit} value={unit + "langt navn"}>
                            {unit}
                          </option>
                        ))}
                      </Select>
                    </InputWrapper>
                  </InputBox>
            </AttributeField>
          )})}
        </TabRow>
        
        
      )}
      {/* TODO: Return max 6 columns, handle all rows. Wait for Arjun's design first.*/}
      {index === 2 && (
        <TabRow>
          <SetConnectorColumn
            list={connectorAttributes}
            handleChange={handleOnConnectorChange}
          ></SetConnectorColumn>
        </TabRow>
      )}

      {index === 3 && (
        <RelationTabComponent
        node={node}
        />
      )}
    </>
  );
};

export default TabContent;
