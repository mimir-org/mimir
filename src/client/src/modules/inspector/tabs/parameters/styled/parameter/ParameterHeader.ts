import styled from "styled-components";

const Header = styled.div`
  display: flex;
  flex-direction: row;
  height: 27px;
  background-color: ${(props: { color: string }) => props.color};
  margin: auto;

  .parameterHeader {
    padding-top: 6px;
    padding-left: 20px;
    font-weight: 500;
  }

  .icons {
    display: flex;
    flex-direction: row;
    margin-left: auto;
  }

  .paramterIcon {
    padding-left: 5px;
    cursor: pointer;
  }
`;

export default Header;
