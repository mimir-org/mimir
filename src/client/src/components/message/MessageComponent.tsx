import { TextResources } from "../../assets/text";
import { Button } from "../../compLibrary/buttons";
import { ButtonWrap, MessageBox, MessageImage, MessageText } from "./MessageComponent.styled";
import { CloseIcon } from "../../assets/icons/close";

interface Props {
  handleSave: () => void;
  handleNoSave: () => void;
  showConfirm: boolean;
  setConfirm: (confirm: boolean) => void;
  text: string;
}

// TODO: make generic
const MessageComponent = ({ handleSave, handleNoSave, showConfirm, setConfirm, text }: Props) =>
  showConfirm && (
    <MessageBox>
      <MessageText>{text}</MessageText>
      <MessageImage src={CloseIcon} alt="icon" onClick={() => setConfirm(!showConfirm)} />
      <ButtonWrap>
        <Button onClick={handleNoSave} text={TextResources.Project_NoSave_Button} />
        <Button onClick={handleSave} text={TextResources.Project_Save_Button} />
      </ButtonWrap>
    </MessageBox>
  );

export default MessageComponent;
