import styled from "styled-components";

const AspectBox = styled.div`
  display: flex;
  cursor: pointer;
  padding: 10px;
  background-color: ${(props: { color: string }) => props.color};

  .checkbox_container {
    padding-top: 6px;
    padding-left: 10px;
    flex: 2;
  }
`;

export default AspectBox;
