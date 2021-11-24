import { WarningIcon } from "../../assets/icons/common";
import { TextResources } from "../../assets/text";
import { Button } from "../buttons";
import { Color } from "../colors";
import { Box, WarningBox, ButtonBox } from "./styled";

interface Props {
  text: string;
  warning?: boolean | false;
  onClick: () => void;
}

/**
 * Component for a box to give a Mimir user feedback.
 * @param interface
 * @returns a box with a message and a close button.
 */
const NotificationBox = ({ text, warning, onClick }: Props) => (
  <Box color={warning ? Color.WarningRed : Color.Black}>
    <WarningBox visible={warning}>
      <img src={WarningIcon} alt="warning-icon" />
    </WarningBox>
    <p className="text">{text}</p>
    <ButtonBox>
      <Button onClick={() => onClick()} type={TextResources.Validation_Cancel} />
    </ButtonBox>
  </Box>
);
export default NotificationBox;
