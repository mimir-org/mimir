import { NavigationButton } from "./Navigation.styled";
import { ArrowDownIcon, ArrowDownInactiveIcon, ArrowUpIcon, ArrowUpInactiveIcon } from "../../../../../../assets/icons/arrow";
import { AspectObject, Project } from "lib";

interface Props {
  isActive: boolean;
  node: AspectObject;
  project: Project;
  onNavigateUpClick: () => void;
  onNavigateDownClick: () => void;
}

export const Navigation = ({ isActive, node, project, onNavigateUpClick, onNavigateDownClick }: Props) => {
  const canNavigateUp = project.hasChildren(node?.id);
  const canNavigateDown = !node.isRoot();

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
