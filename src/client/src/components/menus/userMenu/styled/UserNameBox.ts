import styled from "styled-components";
import { Color } from "../../../../compLibrary/colors";
import { FontSize } from "../../../../compLibrary/font";

const UserNameBox = styled.div`
  position: relative;
  top: 0px;
  font-size: ${FontSize.SubHeader};
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
