import {
  DeleteIcon,
  ValidateIcon,
  LockOpenIcon,
  lockClosedIcon,
} from "../../../../assets/icons/common";

const GetButtonIcon = (type: string) => {
  if (type === "delete") return DeleteIcon;
  if (type === "lock") return LockOpenIcon;
  if (type === "unlock") return lockClosedIcon;
  if (type === "validate") return ValidateIcon;
};

export default GetButtonIcon;
