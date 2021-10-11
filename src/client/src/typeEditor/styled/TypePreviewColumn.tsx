import styled from "styled-components";

const TypePreviewColumn = styled.div`
  display: flex;
  flex: ${(props: { wide: number }) => (props.wide === undefined ? 1 : props.wide)};
  flex-direction: column;
`;

export default TypePreviewColumn;
