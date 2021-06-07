import { Node, Connector, TERMINAL } from "../../../models/project";
import {
  GetConnectorIcon,
  GetConnectorName,
  SortConnectors,
} from "../helpers/common";
import {
  BlockOptionsBox,
  OptionsElement,
} from "../../../componentLibrary/blockView";

interface Props {
  isOpen: boolean;
  list: (Node | Connector)[];
  type?: typeof TERMINAL;
  handleClick: any;
  isChecked?: any;
  width?: number;
}

const OptionsComponent = ({
  isOpen,
  list,
  type,
  handleClick,
  isChecked,
  width,
}: Props) => {
  return type === TERMINAL ? (
    <BlockOptionsBox visible={isOpen} type={TERMINAL} width={width}>
      {SortConnectors(list).map((conn: Connector) => (
        <OptionsElement
          type={TERMINAL}
          key={conn.id}
          onClick={() => handleClick(conn)}
        >
          <p className="text"> {GetConnectorName(conn)}</p>

          <img
            src={GetConnectorIcon(conn.terminal)}
            alt="icon"
            className="button"
          />
        </OptionsElement>
      ))}
    </BlockOptionsBox>
  ) : (
    <BlockOptionsBox visible={isOpen} width={width}>
      {list.map((node: Node) => {
        return (
          <OptionsElement key={node.id}>
            <p className="text">{node.name ?? node.label}</p>
            <label className={"checkbox-block"}>
              <input
                type="checkbox"
                checked={isChecked(node)}
                onChange={() => handleClick(node)}
              />
              <span className="checkmark-block"></span>
            </label>
          </OptionsElement>
        );
      })}
    </BlockOptionsBox>
  );
};

export default OptionsComponent;
