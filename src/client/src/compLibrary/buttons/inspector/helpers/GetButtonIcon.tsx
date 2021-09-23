import {
  DeleteIcon,
  ValidateIcon,
  LockOpenIcon,
} from "../../../../assets/icons/common";

const GetButtonIcon = (type: string) => {
  if (type === "delete") return DeleteIcon;
  if (type === "lock") return LockOpenIcon;
  if (type === "validate") return ValidateIcon;
};

export default GetButtonIcon;
