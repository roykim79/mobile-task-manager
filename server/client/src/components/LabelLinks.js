import React from 'react';

const LabelLinks = (props) => {
  if (Object.keys(props.labels).length > 0) {
    return (
      <ul className="project-links">
        {props.labels.map((label) => {
          return (
            <li key={label._id} className="list">
              <span className="glyphicon glyphicon-tasks">
              </span>{label.name}
            </li>
          )
        })}
      </ul>
    )
  } else {
    return (
      <div></div>
    );
  }
}

export default LabelLinks;