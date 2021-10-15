import styled from "styled-components";
interface Props {
  input?: boolean;
}

const Terminals = styled.div<Props>`
  max-height: 130px;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 5px;
  left: ${(props) => props.input && `-115px`};
  right: ${(props) => !props.input && `-115px`};
  span {
    padding-bottom: 2px;
  }
`;

export default Terminals;
