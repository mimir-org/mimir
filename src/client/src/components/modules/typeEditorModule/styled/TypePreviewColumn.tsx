import styled from "styled-components";

const TypePreviewColumn = styled.div`
  display: flex;
  width: ${(props: { wide: number }) =>
    props.wide === undefined ? `25%` : props.wide + `%`};
  flex-direction: column;
`;

export default TypePreviewColumn;
