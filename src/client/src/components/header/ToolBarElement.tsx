import { ToolElementBox } from "./styled";

interface Props {
  treeView: boolean;
  onClick: () => void;
  icon: string;
  label: string;
}
/**
 * Component for one element in the ToolBar Component.
 * @param interface
 * @returns a clickable box in the ToolBar.
 */
const ToolBarElement = ({ treeView, onClick, icon, label }: Props) => (
  <ToolElementBox treeView={treeView} onClick={() => onClick()}>
    <img src={icon} alt={label} className="logo" />
  </ToolElementBox>
);

export default ToolBarElement;
