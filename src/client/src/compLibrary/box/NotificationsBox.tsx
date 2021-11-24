import { WarningIcon } from "../../assets/icons/common";
import { TextResources } from "../../assets/text";
import { Button } from "../buttons";
import { Color } from "../colors";
import { Box, WarningBox } from "./styled";

interface Props {
  text: string;
  warning?: boolean | false;
  onClick: () => void;
}

const NotificationsBox = ({ text, warning, onClick }: Props) => {
  const color = warning ? Color.WarningRed : Color.Black;

  return (
    <Box color={color}>
      <WarningBox visible={warning}>
        <img src={WarningIcon} alt="warning-icon" />
      </WarningBox>
      <p className="text">{text}</p>
      <Button onClick={onClick} type={TextResources.Project_Cancel} />
    </Box>
  );
};

export default NotificationsBox;
