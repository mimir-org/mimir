import { TextResources } from "../../assets/text";
import { ButtonWrap, MenuButton } from "../../compLibrary/buttons";
import { MessageBox } from "../../compLibrary/box/message";

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
