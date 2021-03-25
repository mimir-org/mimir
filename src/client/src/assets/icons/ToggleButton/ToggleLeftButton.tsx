import styled from "styled-components";

const ToggleLeftButton = styled.div`
  width: 0;
  height: 0;
  border-right: 17px solid #007079;
  border-top: 17px solid transparent;
  border-bottom: 17px solid transparent;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;

  &: hover {
    cursor: pointer;
    font-weight: bold;
  }
`;

export default ToggleLeftButton;
