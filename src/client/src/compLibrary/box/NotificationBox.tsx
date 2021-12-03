import { WarningIcon } from "../../assets/icons/common";
import { TextResources } from "../../assets/text";
import { Button } from "../buttons";
import { Color } from "../colors";
import { Box, WarningBox, ButtonBox } from "./styled";

interface Props {
  message: string;
  warning?: boolean | false;
  onClick: () => void;
}

/**
 * Component for a box to give a Mimir user feedback.
 * @param interface
 * @returns a box with a message and a close button.
 */
const NotificationBox = ({ message, warning, onClick }: Props) => (
  <Box color={warning ? Color.RedWarning : Color.Black}>
    <WarningBox visible={warning}>
      <img src={WarningIcon} alt="warning-icon" />
    </WarningBox>
    <p className="text">{message}</p>
    <ButtonBox>
      <Button onClick={() => onClick()} text={TextResources.Validation_Ok} />
    </ButtonBox>
  </Box>
);
export default NotificationBox;
