import styled from "styled-components";

const Terminals = styled.div`
  max-height: 130px;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 5px;
  left: ${(props: { input: boolean }) => (props.input ? `-115px` : null)};
  right: ${(props: { input: boolean }) => (props.input ? null : `-115px`)};
  span {
    padding-bottom: 2px;
  }
`;

export default Terminals;
