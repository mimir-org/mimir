import { TextResources } from "../../assets/text";
import { Button } from "../../compLibrary/buttons";
import { MessageBox } from "../../compLibrary/box/message";
import { ButtonWrap } from "./styled";

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
        <Button
          onClick={handleNoSave}
          type={TextResources.Account_NoSave_Button}
        />
        <Button onClick={handleSave} type={TextResources.Account_Save_Button} />
      </ButtonWrap>
    </MessageBox>
  );
};

export default MessageComponent;
