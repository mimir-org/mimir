import { ProjectMenuElement } from "../../styled";
import { GetText, GetIcon } from "./";

interface Props {
  type: string;
  onClick?: () => void;
}

const GetMenuElement = ({ type, onClick }: Props) => (
  <ProjectMenuElement onClick={onClick}>
    <div className="icon">{GetIcon(type)}</div>
    <p className="text">{GetText(type)}</p>
  </ProjectMenuElement>
);

export default GetMenuElement;
