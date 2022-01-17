import styled from "styled-components";

interface HeaderGroupProps {
  gap?: string;
}

const HeaderGroup = styled.div<HeaderGroupProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${(props) => props.gap ?? 'revert'};
`;

export default HeaderGroup;