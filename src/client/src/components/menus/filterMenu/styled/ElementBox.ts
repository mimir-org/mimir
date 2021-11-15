import styled from "styled-components";

const ElementBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-left: 5px;
  margin-bottom: 12px;

  &:hover {
    cursor: pointer;
  }
`;

export default ElementBox;
