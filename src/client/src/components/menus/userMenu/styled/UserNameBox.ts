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
`;

export default UserNameBox;
