import { MenuElement } from "../../styled";
import { GetText, GetIcon } from "./";

interface Props {
  type: string;
  onClick?: () => void;
  disabled?: boolean;
}

const GetMenuElement = ({ type, onClick, disabled }: Props) => (
  <MenuElement onClick={onClick} disabled={disabled}>
    <div className="icon">{GetIcon(type)}</div>
    <p className="text">{GetText(type)}</p>
  </MenuElement>
);

export default GetMenuElement;
