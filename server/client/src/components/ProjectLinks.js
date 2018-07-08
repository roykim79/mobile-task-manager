import React from 'react';

const ProjectLinks = (props) => {
  if (props.projects !== undefined) {
    return (
      <ul className="project-links menu">
        {props.projects
          .sort((a, b) => {
            return a.name.toLowerCase() > b.name.toLowerCase();
          })
          .map((project) => {
          return (
            <li 
              onClick={() => {props.handleClick(project)}}
              key={project._id} 
              className={"project " + (props.currentSelection._id === project._id ? "active" : "normal")}>
              <span>{project.name}</span>
            </li>
          )
        })}
      </ul>
    )
  } else {
    return <div></div>;
  }
}

export default ProjectLinks;