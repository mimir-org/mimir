import styled from "styled-components";

const ToggleExplorerButton = styled.div`
  display: inline;
  margin-top: 3px;
  border-left: 17px solid transparent;
  border-right: 17px solid transparent;
  border-top: ${(props: { visible: boolean }) =>
    props.visible ? "17px solid #007079" : "0px"};
  border-bottom: ${(props: { visible: boolean }) =>
    props.visible ? "0px" : "17px solid #007079"};
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  float: ${(props: { float: string }) => props.float};

  &: hover {
    cursor: pointer;
    font-weight: bold;
  }
`;

export default ToggleExplorerButton;
