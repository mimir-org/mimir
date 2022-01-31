import { NavigationButton } from "../parentContainer/styled";
import { ArrowDownIcon, ArrowDownInactiveIcon, ArrowUpIcon, ArrowUpInactiveIcon } from "../../../../../assets/icons/arrow";
import { Node } from "../../../../../models";
import { HasChildren } from "../../../helpers";
import { IsAspectNode } from "../../../../../helpers";

interface Props {
  isActive: boolean;
  node: Node;
  onNavigateUpClick: () => void;
  onNavigateDownClick: () => void;
}

const Navigation = ({ isActive, node, onNavigateUpClick, onNavigateDownClick }: Props) => {
  const canNavigateUp = HasChildren(node);
  const canNavigateDown = !IsAspectNode(node);

  return (
    isActive && (
      <>
        <NavigationButton disabled={!canNavigateDown} onClick={canNavigateDown ? onNavigateUpClick : null}>
          <img src={canNavigateDown ? ArrowUpIcon : ArrowUpInactiveIcon} alt="arrow up" />
        </NavigationButton>
        <NavigationButton disabled={!canNavigateUp} onClick={canNavigateUp ? onNavigateDownClick : null}>
          <img src={canNavigateUp ? ArrowDownIcon : ArrowDownInactiveIcon} alt="arrow down" />
        </NavigationButton>
      </>
    )
  );
};

export default Navigation;
