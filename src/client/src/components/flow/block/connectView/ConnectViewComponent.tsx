import * as Handlers from "./handlers";
import { Node } from "../../../../models";
import { ConnectMenuIcon } from "../../../../assets/icons/blockView";
import { TextResources } from "../../../../assets/text";
import { ConnectViewBox, ConnectViewMenu, ConnectViewElement } from "./styled";

interface Props {
  node: Node;
  isMenuOpen: boolean;
  children: Node[];
  handleClick: any;
  isChecked?: any;
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
  children,
  handleClick,
  isChecked,
  connectButton,
  showConnectMenu,
  connectMenu,
  dispatch,
}: Props) => (
  <>
    <ConnectViewBox
      visible={connectButton && children.length > 0}
      onClick={() => Handlers.OnConnectMenuClick(showConnectMenu, connectMenu)}
    >
      <img src={ConnectMenuIcon} alt="options" />
    </ConnectViewBox>

    {isMenuOpen && (
      <ConnectViewMenu width={node.width}>
        {children.map((n: Node) => {
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
            onClick={() => Handlers.OnSelectAllClick(dispatch, node, children)}
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
