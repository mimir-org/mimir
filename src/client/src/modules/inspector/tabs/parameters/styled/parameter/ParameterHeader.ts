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
    width: 12px;
    height: 12px;
    margin: auto;
  }

  .lockIcon {
    cursor: ${(props: { isNodeLocked: boolean }) => (props.isNodeLocked ? "default" : "pointer")};
  }
`;

export default Header;
