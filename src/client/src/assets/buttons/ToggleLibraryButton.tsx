import styled from "styled-components";

const ToggleRightButton = styled.div`
  width: 0;
  height: 0;
  border-left: ${(props: { visible: boolean }) =>
    props.visible ? "17px solid #007079" : "0px"};
  border-right: ${(props: { visible: boolean }) =>
    props.visible ? "0px" : "17px solid #007079"};
  border-top: 17px solid transparent;
  border-bottom: 17px solid transparent;
  border-bottom-left-radius: ${(props: { visible: boolean }) =>
    props.visible ? "5px" : "0px"};
  border-top-left-radius: ${(props: { visible: boolean }) =>
    props.visible ? "5px" : "0px"};
  border-bottom-right-radius: ${(props: { visible: boolean }) =>
    props.visible ? "0px" : "5px"};
  border-top-right-radius: ${(props: { visible: boolean }) =>
    props.visible ? "0px" : "5px"};

  &: hover {
    cursor: pointer;
    font-weight: bold;
  }
`;

export default ToggleRightButton;
