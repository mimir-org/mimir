import styled from "styled-components";

const LibraryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 55%;
  border: ${(props: { visible: boolean }) =>
    props.visible ? "1px solid #cbcbcb" : "none"};
`;

export default LibraryWrapper;
