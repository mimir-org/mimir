import { Node, Connector, TERMINAL } from "../../../models/project";
import {
  ConnectViewBox,
  ConnectViewElement,
} from "../../../compLibrary/blockView";

interface Props {
  isOpen: boolean;
  list: (Node | Connector)[];
  type?: typeof TERMINAL;
  handleClick: any;
  isChecked?: any;
  width?: number;
}

const ConnectViewComponent = ({
  isOpen,
  list,
  handleClick,
  isChecked,
  width,
}: Props) => {
  return (
    <ConnectViewBox visible={isOpen} width={width}>
      {list.map((node: Node) => {
        return (
          <ConnectViewElement key={node.id}>
            <p className="text">{node.label ?? node.name}</p>
            <label className={"checkbox-block"}>
              <input
                type="checkbox"
                checked={isChecked(node)}
                onChange={() => handleClick(node)}
              />
              <span className="checkmark-block"></span>
            </label>
          </ConnectViewElement>
        );
      })}
    </ConnectViewBox>
  );
};

export default ConnectViewComponent;
