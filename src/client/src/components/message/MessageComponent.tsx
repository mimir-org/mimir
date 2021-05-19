import { TextResources } from "../../assets/textResources";
import { ButtonWrap } from "../../componentLibrary/buttons";
import { MessageBox } from "../../componentLibrary/box/message";
import { MenuButton } from "../../componentLibrary/buttons";

interface Props {
  handleSave: () => void;
  handleNoSave: () => void;
}

// TODO: Make generic component
const MessageComponent = ({ handleSave, handleNoSave }: Props) => {
  return (
    <MessageBox>
      <p className="message">{TextResources.Account_Confirm_Save}</p>
      <ButtonWrap>
        <MenuButton onClick={handleNoSave}>
          <p className="text">{TextResources.Account_NoSave_Button}</p>
        </MenuButton>
      </ButtonWrap>
      <ButtonWrap>
        <MenuButton onClick={handleSave}>
          <p className="text"> {TextResources.Account_Save_Button}</p>
        </MenuButton>
      </ButtonWrap>
    </MessageBox>
  );
};

export default MessageComponent;
