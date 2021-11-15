import styled from "styled-components";
import { Color } from "../../../../compLibrary/colors";

const UserNameBox = styled.div`
  position: relative;
  top: 0px;
  font-size: 16px;
  font-weight: bold;
  margin-left: 20px;

  .user-title {
    position: relative;
    top: -13px;
    font-size: 13px;
    font-weight: normal;
    color: ${Color.TextSecondary};
  }

  .initials {
    position: absolute;
    right: 23px;
    bottom: 16px;
    color: ${Color.TextIcon};
    font-size: 14px;
    font-weight: normal;
  }

  .user-icon {
    position: absolute;
    right: 16px;
    bottom: 20px;
  }
`;

export default UserNameBox;
