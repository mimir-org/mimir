import styled from "styled-components";

interface Props {
  color: string;
  isNodeLocked: boolean;
}

const Header = styled.div<Props>`
  display: flex;
  flex-direction: row;
  height: 27px;
  background-color: ${(props) => props.color};
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

    :last-child {
      padding-right: 5px;
    }
  }

  .warningIcon {
    margin: auto -10px auto 10px;
  }

  .parameterIcon {
    padding-left: 5px;
    cursor: pointer;
    margin: auto;
  }

  .lockIcon {
    cursor: ${(props) => (props.isNodeLocked ? "default" : "pointer")};
  }
`;

export default Header;
