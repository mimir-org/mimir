interface Props {
  base64: string;
  text: string;
}

const Symbol = ({ base64, text }: Props) => {
  return (
    <>
      {base64 && (
        <img
          src={"data:image/svg+xml;base64," + base64}
          alt={text}
          draggable="false"
        />
      )}
    </>
  );
};

export default Symbol;
