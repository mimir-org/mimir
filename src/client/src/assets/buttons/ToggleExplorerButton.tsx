import styled from "styled-components";

const ToggleExplorerButton = styled.div`
  width: 0;
  height: 0;
  border-left: ${(props: { visible: boolean }) =>
    props.visible ? "0px" : "17px solid #007079"};
  border-right: ${(props: { visible: boolean }) =>
    props.visible ? "17px solid #007079" : "0px"};
  border-top: 17px solid transparent;
  border-bottom: 17px solid transparent;
  border-bottom-left-radius: ${(props: { visible: boolean }) =>
    props.visible ? "0px" : "5px"};
  border-top-left-radius: ${(props: { visible: boolean }) =>
    props.visible ? "0px" : "5px"};
  border-bottom-right-radius: ${(props: { visible: boolean }) =>
    props.visible ? "5px" : "0px"};
  border-top-right-radius: ${(props: { visible: boolean }) =>
    props.visible ? "5px" : "0px"};

  &: hover {
    cursor: pointer;
    font-weight: bold;
  }
`;

export default ToggleExplorerButton;
