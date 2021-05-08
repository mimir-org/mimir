import styled from "styled-components";

const AccountBox = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  padding-left: 10px;
  padding-right: 10px;
  z-index: 1103;
  font-family: roboto;
  width: 240px;

  .account_clickable {
    max-width: min-content;
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    height: 44px;
    margin-left: -10px;
    padding-left: 10px;
    padding-right: 12px;
    background-color: #007079;
    color: #ffffff;

    .project_name {
      font-size: 16px;
      text-transform: uppercase;
    }

    .project_name_opened {
      text-decoration: underline;
      font-weight: bold;
    }
  }
`;

export default AccountBox;
