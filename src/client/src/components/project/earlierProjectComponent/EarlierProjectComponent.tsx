import { useState } from "react";
import { useHistory } from "react-router-dom";
import GetImg from "../helpers/GetImg";
import textResources from "../../../textResources";

export const EarlierProjectComponent = () => {
  let history = useHistory();
  const goback = () => {
    history.goBack();
  };
  const [searchbarInput, setsearchbarInput] = useState("");
  const [buttonHover, setbuttonHover] = useState(false);

  const projectData = [
    {
      projectid: 1,
      projectname: "Noaka",
      projectowner: "Team Lead Engineering base",
      lastedited: "11/12/20",
    },
    {
      projectid: 2,
      projectname: "Johan Sverdrup",
      projectowner: "Project owner",
      lastedited: "21/09/20",
    },
    {
      projectid: 3,
      projectname: "Heimdal",
      projectowner: "Project owner",
      lastedited: "15/01/21",
    },
  ];

  const handleChange = (e) => {
    setsearchbarInput(e.target.value);
  };

  const filteredProjects = () => {
    return projectData.filter((project) =>
      project.projectname.toLowerCase().includes(searchbarInput.toLowerCase())
    );
  };

  return (
    <div className="earlier_project_container">
      <div className="earlier_project_content">
        <div className="earlier_project_header">
          <GetImg icon="LeftArrowIcon" imgOnClick={() => goback()} />
          <p className="earlier_project_header_text">
            {textResources.Project_open_project}
          </p>
        </div>
        <div className="earlier_project_searchbar_container">
          <label htmlFor="search" />
          <input
            type="text"
            value={searchbarInput}
            placeholder="Search projects"
            onChange={handleChange}
            autoFocus
          />
          <GetImg icon="SearchIcon" />
        </div>
        <div className="project_list">
          <p className="recent_projects_text">
            {textResources.Project_recent_project}
          </p>
          <div className="project_list_labels">
            <p className="project_name">{textResources.Project_recent_name}</p>
            <p className="project_owner">
              {textResources.Project_recent_owner}
            </p>
            <p className="last_edited">{textResources.Project_recent_edited}</p>
          </div>
          {filteredProjects().map((project) => {
            return (
              <div key={project.projectid} className="project_list_data">
                <p className="project_name_data">{project.projectname}</p>
                <p className="project_owner_data">{project.projectowner}</p>
                <p className="last_edited">{project.lastedited}</p>
              </div>
            );
          })}
        </div>
        <div className="open_project_button_wrapper">
          <div
            className="open_project_button"
            onMouseOver={() => {
              setbuttonHover(true);
            }}
            onMouseOut={() => {
              setbuttonHover(false);
            }}
          >
            <p className="open_project_button_text">
              {textResources.Project_recent_open}
            </p>
            {buttonHover ? (
              <GetImg icon="WhiteRightArrowIcon" />
            ) : (
              <GetImg icon="" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarlierProjectComponent;
