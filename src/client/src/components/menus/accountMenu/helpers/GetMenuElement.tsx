import { MenuElement } from "../../../../componentLibrary";
import { GetText, GetIcon } from "./";

const GetMenuElement = (type: string, onClick: () => void) => {
  return (
    <MenuElement onClick={onClick}>
      {GetIcon(type)}
      <p className="text">{GetText(type)}</p>
    </MenuElement>
  );
};

export default GetMenuElement;
