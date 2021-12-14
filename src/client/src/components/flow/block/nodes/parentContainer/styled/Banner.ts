import styled from "styled-components";

interface Props {
  color: string;
}

const Banner = styled.div<Props>`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 100%;
  border-radius: 8px 8px 0px 0px;
  background-color: ${(props) => props.color};
  z-index: 1;
`;

export default Banner;
