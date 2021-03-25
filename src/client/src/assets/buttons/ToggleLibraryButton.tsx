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
  border-bottom-left-radius: 0px;
  border-top-left-radius: 0px;

  &: hover {
    cursor: pointer;
    font-weight: bold;
  }
`;

export default ToggleRightButton;
