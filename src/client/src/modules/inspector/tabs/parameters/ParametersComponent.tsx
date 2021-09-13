import { TextResources } from "../../../../assets/text";
import { Dropdown } from "../../../../compLibrary/dropdown/mimir";
import { Node } from "../../../../models";
import { EntityWrapper, ParametersHeader } from "./styled";

interface Props {
  node: Node;
}
const ParametersComponent = ({ node }: Props) => {
  return (
    <ParametersHeader>
      <EntityWrapper>
        <Dropdown
          label=""
          onChange={() => null}
          keyProp={null}
          valueProp={null}
          items={node.connectors}
        />
        <div className="text">{TextResources.Inspector_Params_Clear_All}</div>
        <div className="text">{TextResources.Inspector_Params_Default}</div>
      </EntityWrapper>
    </ParametersHeader>
  );
};
export default ParametersComponent;

//   const dispatch = useDispatch();

//   const onNodeChange = (id: string, value: string, unit: any) => {
//     dispatch(changeAttributeValue(id, value, unit, node.id));
//   };

//   const tempAttributes: ConnectorAttribute[] = [];
//   let nodeAttributes: Attribute[] = [];

//   if (node) {
//     node.connectors?.forEach((conn) => {
//       if (IsTransportTerminal(conn)) {
//         const data = {
//           id: conn.id,
//           name: conn.name + " " + conn.type,
//           attributes: conn.attributes,
//         } as ConnectorAttribute;
//         tempAttributes.push(data);
//       }
//     });
//     nodeAttributes = node.attributes;
//   }
