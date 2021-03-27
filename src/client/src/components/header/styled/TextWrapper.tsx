import styled from "styled-components";

const TextWrapper = styled.div`
  position: relative;
  font-family: roboto;
  font-size: 18px;
  bottom: 9px;
  left: ${(props) => (props.target === "title" ? "47" : "87")}%;
`;

export default TextWrapper;
