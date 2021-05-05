import "./project.scss";
import AspectComponent from "../aspectComponent/AspectComponent";
import { AspectWrapper } from "../styled";
import { IsAspectNode } from "../../../flow/helpers";
import store from "../../../../redux/store";

export const ProjectComponent = ({ visible }) => {
  const project = store.getState().projectState.project;
  const aspects = project ? project.nodes : [];

  return (
    <AspectWrapper visible={visible}>
      {aspects.map((obj: object, i: number) => {
        if (IsAspectNode(aspects[i].type)) {
          return (
            <AspectComponent
              key={i}
              nodeId={obj["id"]}
              name={obj["name"]}
              aspectType={obj["type"]}
            />
          );
        }
        return null;
      })}
    </AspectWrapper>
  );
};

export default ProjectComponent;
