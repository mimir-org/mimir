import styled from "styled-components";
import { Color } from "../../../../compLibrary/colors";
import { FontSize, FontWeight } from "../../../../compLibrary/font";

const UserNameBox = styled.div`
  position: relative;
  top: 0px;
  font-size: ${FontSize.SubHeader};
  font-weight: ${FontWeight.Bold};
  margin-left: 20px;

  .user-role {
    position: relative;
    top: -13px;
    font-size: 13px;
    font-weight: ${FontWeight.Normal};
    color: ${Color.TextSecondary};
  }
`;

export default UserNameBox;
