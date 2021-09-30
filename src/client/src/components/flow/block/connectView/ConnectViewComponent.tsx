import * as Click from "./handlers";
import { Node } from "../../../../models";
import { ConnectMenuIcon } from "../../../../assets/icons/blockView";
import { TextResources } from "../../../../assets/text";
import { ConnectViewBox, Menu, Element } from "./styled";
import { CalculateMenuPos } from "./helpers";

interface Props {
  node: Node;
  isMenuOpen: boolean;
  children: Node[];
  connectNodes: Node[];
  handleClick: any;
  isChecked: (node: Node, nodes: Node[]) => boolean;
  connectBox: boolean;
  showConnectMenu: any;
  connectMenu: boolean;
  dispatch: any;
}

/**
 * Component for the ConnectView menu in BlockView
 * @param param0
 * @returns a drop-down list where you can select a nodes' children
 */
const ConnectViewComponent = ({
  node,
  isMenuOpen,
  children,
  connectNodes,
  handleClick,
  isChecked,
  connectBox,
  showConnectMenu,
  connectMenu,
  dispatch,
}: Props) => (
  <>
    <ConnectViewBox
      visible={connectBox && children.length > 0}
      onClick={() => Click.OnConnectMenu(showConnectMenu, connectMenu)}
    >
      <img src={ConnectMenuIcon} alt="menu" />
    </ConnectViewBox>

    {isMenuOpen && (
      <Menu bottom={CalculateMenuPos(children.length)}>
        {children.map((n: Node) => {
          return (
            <Element key={n.id}>
              <p className="text">{n.label ?? n.name}</p>
              <label className={"checkbox-block"}>
                <input
                  type="checkbox"
                  checked={isChecked(n, connectNodes)}
                  onChange={() => handleClick(n)}
                />
                <span className="checkmark-block"></span>
              </label>
            </Element>
          );
        })}
        <Element>
          <div
            className="select"
            onClick={() => Click.OnSelectAll(dispatch, node, children)}
          >
            {TextResources.ConnectMenu_Select_All}
          </div>
          <div
            className="select"
            onClick={() => Click.OnClearAll(dispatch, node)}
          >
            {TextResources.ConnectMenu_Clear_All}
          </div>
        </Element>
      </Menu>
    )}
  </>
);

export default ConnectViewComponent;
