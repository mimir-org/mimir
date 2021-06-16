import styled from "styled-components";

const AspectBox = styled.div`
  display: flex;
  cursor: pointer;
  padding: 5px;
  /* position: relative; */
  background-color: ${(props: { color: string }) => props.color};

  .icon {
    position: relative;
    top: 0.1px;
    left: 10px;
  }

  .checkbox_container {
    flex: 2;
    margin-top: 5px;
    padding-left: 22px;
  }
`;

export default AspectBox;
