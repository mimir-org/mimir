import { ProjectMenuElement } from "../../styled";
import { GetText, GetIcon } from ".";

interface Props {
  type: string;
  onClick?: () => void;
  disabled?: boolean;
}

const GetMenuElement = ({ type, onClick, disabled }: Props) => (
  <ProjectMenuElement onClick={onClick} disabled={disabled}>
    <div className="icon">{GetIcon(type)}</div>
    <p className="text">{GetText(type)}</p>
  </ProjectMenuElement>
);

export default GetMenuElement;
