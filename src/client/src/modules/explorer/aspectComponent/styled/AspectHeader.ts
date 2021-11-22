import styled from "styled-components";

const AspectHeader = styled.div`
  height: 30px;

  .label {
    position: relative;
    left: 2px;
    top: 2px;
  }

  .icon {
    position: relative;
    top: 6px;
    left: 6px;
    pointer-events: none;
  }
`;

export default AspectHeader;
