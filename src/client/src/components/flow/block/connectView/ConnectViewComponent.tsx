import * as Click from "./handlers";
import { Node } from "../../../../models";
import { ConnectMenuIcon } from "../../../../assets/icons/blockView";
import { TextResources } from "../../../../assets/text";
import { CalculateMenuPos } from "./helpers";
import { ConnectViewBox, Menu, Element, Footer } from "./styled";

interface Props {
  node: Node;
  isMenuOpen: boolean;
  children: Node[];
  connectNodes: Node[];
  handleClick: (node: Node) => void;
  isChecked: (node: Node, nodes: Node[]) => boolean;
  connectBox: boolean;
  showConnectMenu: any;
  connectMenu: boolean;
  dispatch: any;
}

/**
 * Component for the ConnectView menu in BlockView.
 * @param param0
 * @returns a drop-down list where you can select a nodes' children.
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
              <div className="text" onClick={() => handleClick(n)}>
                {n.label ?? n.name}
              </div>
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
          <Footer onClick={() => Click.OnSelectAll(dispatch, node, children)}>
            {TextResources.ConnectMenu_Select_All}
          </Footer>
          <Footer onClick={() => Click.OnClearAll(dispatch, node)}>
            {TextResources.ConnectMenu_Clear_All}
          </Footer>
        </Element>
      </Menu>
    )}
  </>
);

export default ConnectViewComponent;
