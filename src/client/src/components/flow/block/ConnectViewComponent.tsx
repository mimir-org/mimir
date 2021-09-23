import { Node, Connector } from "../../../models";
import { ConnectMenuIcon } from "../../../assets/icons/blockView";
import { OnConnectMenuClick } from "../nodes/blockFunctionNode/handlers";
import {
  ConnectViewBox,
  ConnectViewMenu,
  ConnectViewElement,
} from "../../../compLibrary/blockView";

interface Props {
  isOpen: boolean;
  list: (Node | Connector)[];
  handleClick: any;
  isChecked?: any;
  width?: number;
  hasChildren: boolean;
  connectButton: boolean;
  showConnectMenu: any;
  connectMenu: boolean;
}

/** Component for the ConnectView menu. This is the menu in the upper-left corner of a parent node.
 *  The component returns a drop-down menu where you can select the children nodes.
 */
const ConnectViewComponent = ({
  isOpen,
  list,
  handleClick,
  isChecked,
  width,
  hasChildren,
  connectButton,
  showConnectMenu,
  connectMenu,
}: Props) => (
  <>
    <ConnectViewBox
      visible={connectButton && hasChildren}
      onClick={() => OnConnectMenuClick(showConnectMenu, connectMenu)}
    >
      <img src={ConnectMenuIcon} alt="options" />
    </ConnectViewBox>
    {isOpen && (
      <ConnectViewMenu visible={isOpen} width={width}>
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
      </ConnectViewMenu>
    )}
  </>
);
export default ConnectViewComponent;
