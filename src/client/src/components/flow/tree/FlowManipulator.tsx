import { useEffect } from "react";
import { Elements, useStoreActions } from "react-flow-renderer";

interface Props {
  elements: Elements<any>;
  selectedId: string;
}

export function FlowManipulator({ elements, selectedId }: Props) {
  const setSelected = useStoreActions((state) => state.setSelectedElements);

  useEffect(() => {
    if (elements) {
      setSelected(elements.filter((ele) => ele.id === selectedId));
    }
  }, [elements, selectedId, setSelected]);

  return null;
}
