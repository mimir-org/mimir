import styled from "styled-components";

const ToggleUpButton = styled.div`
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-bottom: 20px solid #007079;
  border-top: 0px;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;

  &: hover {
    cursor: pointer;
    font-weight: bold;
  }
`;

export default ToggleUpButton;
