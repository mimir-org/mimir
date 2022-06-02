import { SymbolImage } from "./Symbol.styled";

interface Props {
  source: string;
  text: string;
}

const Symbol = ({ source, text }: Props) => {
  if (source === null || source === undefined) return null;

  if (source.startsWith("http")) return <SymbolImage src={source} alt={text} draggable="false" />;

  return <SymbolImage src={"data:image/svg+xml;base64," + source} alt={text} draggable="false" />;
};

export default Symbol;
