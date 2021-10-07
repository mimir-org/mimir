import * as Click from "./handlers";
import { Node } from "../../../../models";
import { FunctionConnectMenu, ProductConnectMenu } from "../../../../assets/icons/blockView/connectView";
import { TextResources } from "../../../../assets/text";
import { CalculateMenuPos } from "./helpers/position";
import { ConnectViewBox, Menu, Element, Footer } from "./styled";
import { IsFunction } from "../../helpers";
import { Color } from "../../../../compLibrary";

interface Props {
  node: Node;
  visible: boolean;
  children: Node[];
  connectNodes: Node[];
  onClick: (node: Node) => void;
  isChecked: (node: Node, nodes: Node[]) => boolean;
  connectBox: boolean;
  showConnectMenu: any;
  dispatch: any;
  onBlur: () => void;
}

/**
 * Component for the ConnectView menu in BlockView.
 * @param interface
 * @returns a drop-down list where you can select a nodes' children.
 */
const ConnectViewComponent = ({
  node,
  visible,
  children,
  connectNodes,
  onClick,
  isChecked,
  connectBox,
  showConnectMenu,
  dispatch,
  onBlur,
}: Props) => (
  <>
    <ConnectViewBox
      visible={connectBox && children.length > 0}
      onClick={() => Click.OnConnectMenu(showConnectMenu, visible)}
    >
      <img src={IsFunction(node) ? FunctionConnectMenu : ProductConnectMenu} alt="menu" />
    </ConnectViewBox>

    {visible && (
      <Menu
        bottom={CalculateMenuPos(children.length)}
        tabIndex={0}
        onBlur={onBlur}
        color={IsFunction(node) ? Color.FunctionSelected : Color.ProductSelected}
      >
        {children.map((n: Node) => {
          return (
            <Element key={n.id}>
              <div className="text" onClick={() => onClick(n)}>
                {n.label ?? n.name}
              </div>
              <label className={"checkbox-block"}>
                <input type="checkbox" checked={isChecked(n, connectNodes)} onChange={() => onClick(n)} />
                <span className="checkmark-block"></span>
              </label>
            </Element>
          );
        })}
        <Element color={IsFunction(node) ? Color.FunctionSelected : Color.ProductSelected}>
          <Footer onClick={() => Click.OnSelectAll(dispatch, node, children)}>
            {TextResources.ConnectMenu_Select_All}
          </Footer>
          <Footer onClick={() => Click.OnClearAll(dispatch, node)}>{TextResources.ConnectMenu_Clear}</Footer>
        </Element>
      </Menu>
    )}
  </>
);

export default ConnectViewComponent;
