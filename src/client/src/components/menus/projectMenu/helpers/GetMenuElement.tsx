import { MenuElement } from "../../styled";
import { GetText, GetIcon } from "./";

interface Props {
  type: string;
  onClick?: () => void;
}

const GetMenuElement = ({ type, onClick }: Props) => (
  <MenuElement onClick={onClick}>
    <div className="icon">{GetIcon(type)}</div>
    <p className="text">{GetText(type)}</p>
  </MenuElement>
);

export default GetMenuElement;
