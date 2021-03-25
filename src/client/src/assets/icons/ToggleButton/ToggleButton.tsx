/* This is a dynamic version of the ToggleButton. 
Props define the look and direction of the button. */

import styled from "styled-components";

const ToggleButton = styled.div`
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-top: ${(props: { visible: boolean }) =>
    props.visible ? "20px solid #007079" : "0px"};
  border-bottom: ${(props: { visible: boolean }) =>
    props.visible ? "0px" : "20px solid #007079"};
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  float: ${(props: { float: string }) => props.float};

  &: hover {
    cursor: pointer;
    font-weight: bold;
  }
`;

export default ToggleButton;
