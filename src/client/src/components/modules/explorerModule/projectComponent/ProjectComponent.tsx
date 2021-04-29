import "./project.scss";
import AspectComponent from "../aspectComponent/AspectComponent";
// import CheckboxComponent from "../checkboxComponent/CheckboxComponent";
import { AspectWrapper, ProjectHeader } from "../styled";
import { GetNodes } from "../../../flow/helpers";
import { IsAspectNode } from "../../../flow/helpers";

export const ProjectComponent = () => {
  const aspects = GetNodes();

  return (
    <>
      <ProjectHeader>
        {/* <CheckboxComponent nodeId={null} inputLabel={null} type={null} /> */}
      </ProjectHeader>
      <AspectWrapper>
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
    </>
  );
};

export default ProjectComponent;
