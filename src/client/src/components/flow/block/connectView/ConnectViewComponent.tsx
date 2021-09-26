import { Node, Connector } from "../../../../models";
import { ConnectMenuIcon } from "../../../../assets/icons/blockView";
import { OnConnectMenuClick } from "./handlers";
import { ConnectViewBox, ConnectViewMenu, ConnectViewElement } from "./styled";

interface Props {
  isMenuOpen: boolean;
  list: (Node | Connector)[];
  handleClick: any;
  isChecked?: any;
  width?: number;
  hasChildren: boolean;
  connectButton: boolean;
  showConnectMenu: any;
  connectMenu: boolean;
}

/**
 * Component for the ConnectView menu in BlockView
 * @param param0
 * @returns a drop-down list from where you can select a nodes' children
 */
const ConnectViewComponent = ({
  isMenuOpen,
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

    {isMenuOpen && (
      <ConnectViewMenu width={width}>
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
        <ConnectViewElement key={"test"}>
          <p className="link"> Select all</p>
          <p className="link"> Clear all</p>
        </ConnectViewElement>
      </ConnectViewMenu>
    )}
  </>
);
export default ConnectViewComponent;
