import { MenuElement } from "../../../../componentLibrary";
import { GetText, GetIcon } from "./";

const GetMenuElement = (type: string, onClick: () => void) => {
  return (
    <MenuElement onClick={onClick}>
      <GetIcon icon={type} />
      {GetText(type)}
    </MenuElement>
  );
};

export default GetMenuElement;
