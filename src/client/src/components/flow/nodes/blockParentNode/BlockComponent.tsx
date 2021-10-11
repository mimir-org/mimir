import * as Icons from "../../../../assets/icons/arrow";
import { Node } from "../../../../models";
import { HasChildren, IsAspectNode } from "../../helpers";
import { Navigation, Banner, Block, Header } from "./styled";

interface Props {
  node: Node;
  color: string;
  splitView: boolean;
  selected: boolean;
  onParentClick: () => void;
  onChildClick: () => void;
}

/**
 * Component for the parent node block in BlockView
 * @param interface
 * @returns a container that sits on top of a Flow node
 */
const BlockComponent = ({ node, color, splitView, selected, onParentClick, onChildClick }: Props) => (
  <Block id={"function-block-" + node?.id} splitView={splitView} selected={selected}>
    <Banner color={color}>
      <Header>
        {!splitView && (
          <>
            <Navigation>
              <img
                src={IsAspectNode(node) ? Icons.ArrowUpInactive : Icons.ArrowUp}
                alt="up"
                onClick={() => onParentClick()}
              />
            </Navigation>
            <Navigation>
              <img
                src={HasChildren(node) ? Icons.ArrowDown : Icons.ArrowDownInactive}
                alt="down"
                onClick={() => onChildClick()}
              />
            </Navigation>
          </>
        )}
        <p className="text">={node?.label ?? node?.name}</p>
      </Header>
    </Banner>
  </Block>
);
export default BlockComponent;
