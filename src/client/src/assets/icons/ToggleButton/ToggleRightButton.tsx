import styled from "styled-components";

const ToggleRightButton = styled.div`
  width: 0;
  height: 0;
  border-left: 40px solid #007079;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;

  &: hover {
    cursor: pointer;
    font-weight: bold;
  }
`;

export default ToggleRightButton;
