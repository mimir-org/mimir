import { Node, Connector } from "../../../models";
import {
  ConnectViewBox,
  ConnectViewElement,
} from "../../../compLibrary/blockView";

/** Component for the ConnectView menu. This is the menu in the upper-left corner of a parent node
 *  The component returns a drop-down menu where you can select the children nodes
 */

interface Props {
  isOpen: boolean;
  list: (Node | Connector)[];
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
}: Props) => (
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
export default ConnectViewComponent;
