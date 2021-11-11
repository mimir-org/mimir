import styled from "styled-components";

const UserNameBox = styled.div`
  position: relative;
  top: 0px;
  font-size: 16px;
  font-weight: bold;
  margin-left: 20px;

  .title {
    position: relative;
    top: -13px;
    font-size: 13px;
    font-weight: normal;
  }

  .user-icon {
    position: absolute;
    right: 16px;
    bottom: 20px;
  }
`;

export default UserNameBox;
