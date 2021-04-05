import styled from "styled-components";

const ToggleInspectorButton = styled.div`
  display: inline;
  margin-top: 8px;
  margin-right: 10px;
  float: right;
  border-left: 17px solid transparent;
  border-right: 17px solid transparent;
  border-top: ${(props: { visible: boolean }) =>
    props.visible ? "17px solid #007079" : "0px"};
  border-bottom: ${(props: { visible: boolean }) =>
    props.visible ? "0px" : "17px solid #007079"};
  border-top-right-radius: ${(props: { visible: boolean }) =>
    props.visible ? "5px" : "0px"};
  border-top-left-radius: ${(props: { visible: boolean }) =>
    props.visible ? "5px" : "0px"};
  border-bottom-right-radius: ${(props: { visible: boolean }) =>
    props.visible ? "0px" : "5px"};
  border-bottom-left-radius: ${(props: { visible: boolean }) =>
    props.visible ? "0px" : "5px"};

  &: hover {
    cursor: pointer;
    font-weight: bold;
  }
`;

export default ToggleInspectorButton;
