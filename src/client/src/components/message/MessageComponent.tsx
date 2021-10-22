import { TextResources } from "../../assets/text";
import { Button } from "../../compLibrary/buttons";
import { MessageBox } from "../../compLibrary/box/message";
import { ButtonWrap } from "./styled";
import { CloseIcon } from "../../assets/icons/close";
interface Props {
  handleSave: () => void;
  handleNoSave: () => void;
  showConfirm: boolean;
  setConfirm: any;
}

// TODO: Make generic component
const MessageComponent = ({ handleSave, handleNoSave, showConfirm, setConfirm }: Props) => {
  return (
    <>
      {showConfirm && (
        <MessageBox>
          <p className="message">{TextResources.Account_Confirm_Save}</p>
          <img src={CloseIcon} alt="icon" onClick={() => setConfirm(!showConfirm)} className="icon" />
          <ButtonWrap>
            <Button onClick={handleNoSave} type={TextResources.Account_NoSave_Button} />
            <Button onClick={handleSave} type={TextResources.Account_Save_Button} />
          </ButtonWrap>
        </MessageBox>
      )}
    </>
  );
};

export default MessageComponent;
