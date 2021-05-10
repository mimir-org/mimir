import { Aspect } from "./aspectComponent/Aspect";
import { IsAspectNode } from "../../flow/helpers";
import store from "../../../redux/store";

export const Project = () => {
  const project = store.getState().projectState.project;
  const aspects = project ? project.nodes : [];

  return (
    <>
      {aspects.map((obj: object, i: number) => {
        if (IsAspectNode(aspects[i].type)) {
          return (
            <Aspect
              key={i}
              nodeId={obj["id"]}
              name={obj["name"]}
              aspectType={obj["type"]}
            />
          );
        }
        return null;
      })}
    </>
  );
};

export default Project;
