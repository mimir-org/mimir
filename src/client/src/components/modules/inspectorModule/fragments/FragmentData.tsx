import {
  StyledParagraph,
  StyledColumn,
  StyledInput,
  StyledContainer,
} from "./styled";

const FragmentData = ({ data }) => {
  const CreateColumn = (start: number, stop: number) => {
    // Fix when data content is known
    if (stop > data.length || start > data.length) {
      start = data.length - 4;
      stop = data.length;
    }

    return (
      <StyledColumn>
        {data.slice(start, stop).map((data) => (
          <>
            <StyledParagraph key={data.type}>{data.type}</StyledParagraph>
            <StyledInput />
          </>
        ))}
      </StyledColumn>
    );
  };

  return (
    <StyledContainer>
      {CreateColumn(0, 4)}
      {CreateColumn(4, 8)}
      {CreateColumn(8, 12)}
      {CreateColumn(12, 16)}
    </StyledContainer>
  );
};

export default FragmentData;
