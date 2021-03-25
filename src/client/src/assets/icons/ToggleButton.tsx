import styled from "styled-components";

const ToggleButton = styled.div`
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-top: ${(props: { visible: string }) =>
    props.visible ? "20px solid #007079" : "0px"};
  border-bottom: ${(props: { visible: string }) =>
    props.visible ? "0px" : "20px solid #007079"};
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  float: right;
  margin-top: 4%;
  &: hover {
    cursor: pointer;
    font-weight: bold;
  }
`;

export default ToggleButton;
