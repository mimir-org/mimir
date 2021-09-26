import * as Handlers from "./handlers";
import { Node, Connector } from "../../../../models";
import { ConnectMenuIcon } from "../../../../assets/icons/blockView";
import { TextResources } from "../../../../assets/text";
import { ConnectViewBox, ConnectViewMenu, ConnectViewElement } from "./styled";

interface Props {
  node: Node;
  isMenuOpen: boolean;
  list: (Node | Connector)[];
  handleClick: any;
  isChecked?: any;
  hasChildren: boolean;
  connectButton: boolean;
  showConnectMenu: any;
  connectMenu: boolean;
  dispatch: any;
}

/**
 * Component for the ConnectView menu in BlockView
 * @param param0
 * @returns a drop-down list from where you can select a nodes' children
 */
const ConnectViewComponent = ({
  node,
  isMenuOpen,
  list,
  handleClick,
  isChecked,
  hasChildren,
  connectButton,
  showConnectMenu,
  connectMenu,
  dispatch,
}: Props) => (
  <>
    <ConnectViewBox
      visible={connectButton && hasChildren}
      onClick={() => Handlers.OnConnectMenuClick(showConnectMenu, connectMenu)}
    >
      <img src={ConnectMenuIcon} alt="options" />
    </ConnectViewBox>

    {isMenuOpen && (
      <ConnectViewMenu width={node.width}>
        {list.map((n: Node) => {
          return (
            <ConnectViewElement key={n.id}>
              <p className="text">{n.label ?? n.name}</p>
              <label className={"checkbox-block"}>
                <input
                  type="checkbox"
                  checked={isChecked(n)}
                  onChange={() => handleClick(n)}
                />
                <span className="checkmark-block"></span>
              </label>
            </ConnectViewElement>
          );
        })}
        <ConnectViewElement>
          <div
            className="select"
            onClick={() => Handlers.OnSelectAllClick(dispatch)}
          >
            {TextResources.ConnectMenu_Select_All}
          </div>
          <div
            className="select"
            onClick={() => Handlers.OnClearAllClick(dispatch, node)}
          >
            {TextResources.ConnectMenu_Clear_All}
          </div>
        </ConnectViewElement>
      </ConnectViewMenu>
    )}
  </>
);

export default ConnectViewComponent;
