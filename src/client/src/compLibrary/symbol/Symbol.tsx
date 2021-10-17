interface Props {
  base64: string;
  text: string;
}

const Symbol = ({ base64, text }: Props) => {
  if (base64 === null || base64 === undefined) return null;
  return <img src={"data:image/svg+xml;base64," + base64} className="symbolImg" alt={text} draggable="false" />;
};

export default Symbol;
