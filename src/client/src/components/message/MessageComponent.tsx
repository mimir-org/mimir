import { TextResources } from "../../assets/text";
import { Button } from "../../compLibrary/buttons";
import { ButtonWrap, MessageBox } from "./styled";
import { CloseIcon } from "../../assets/icons/close";

interface Props {
  handleSave: () => void;
  handleNoSave: () => void;
  showConfirm: boolean;
  setConfirm: any;
  text: string;
}

// TODO: make generic
const MessageComponent = ({ handleSave, handleNoSave, showConfirm, setConfirm, text }: Props) =>
  showConfirm && (
    <MessageBox>
      <p className="message">{text}</p>
      <img src={CloseIcon} alt="icon" onClick={() => setConfirm(!showConfirm)} className="icon" />
      <ButtonWrap>
        <Button onClick={handleNoSave} type={TextResources.Account_NoSave_Button} />
        <Button onClick={handleSave} type={TextResources.Account_Save_Button} />
      </ButtonWrap>
    </MessageBox>
  );

export default MessageComponent;
