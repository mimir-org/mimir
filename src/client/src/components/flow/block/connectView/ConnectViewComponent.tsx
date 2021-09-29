import * as Click from "./handlers";
import { Node } from "../../../../models";
import { ConnectMenuIcon } from "../../../../assets/icons/blockView";
import { TextResources } from "../../../../assets/text";
import { ConnectViewBox, Menu, Element, Footer } from "./styled";

interface Props {
  node: Node;
  height: number;
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
 * @returns a drop-down list where you can select a nodes' children
 */
const ConnectViewComponent = ({
  node,
  height,
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
      onClick={() => Click.OnConnectMenu(showConnectMenu, connectMenu)}
    >
      <img src={ConnectMenuIcon} alt="options" />
    </ConnectViewBox>

    {isMenuOpen && (
      <>
        <Menu height={height}>
          {children.map((n: Node) => {
            return (
              <Element key={n.id}>
                <p className="text">{n.label ?? n.name}</p>
                <label className={"checkbox-block"}>
                  <input
                    type="checkbox"
                    checked={isChecked(n)}
                    onChange={() => handleClick(n)}
                  />
                  <span className="checkmark-block"></span>
                </label>
              </Element>
            );
          })}
        </Menu>
        <Footer>
          <div onClick={() => Click.OnSelectAll(dispatch, node, children)}>
            <p className="select">{TextResources.ConnectMenu_Select_All}</p>
          </div>
          <div onClick={() => Click.OnClearAll(dispatch, node)}>
            <p className="select">{TextResources.ConnectMenu_Clear_All}</p>
          </div>
        </Footer>
      </>
    )}
  </>
);

export default ConnectViewComponent;
