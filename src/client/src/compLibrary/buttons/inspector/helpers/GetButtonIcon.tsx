import {
  DeleteIcon,
  LockIcon,
  ValidateIcon,
} from "../../../../assets/icons/common";

const GetButtonIcon = (type: string) => {
  if (type === "delete") return DeleteIcon;
  if (type === "lock") return LockIcon;
  if (type === "validate") return ValidateIcon;
};

export default GetButtonIcon;
