import React from 'react';

const TaskPreview = (props) => {
  this.statusClassHandler = (status) => {
    switch (status) {
      case 'In progress':
        return 'yellow';
      case 'Not started':
        return 'red';
      case 'Completed':
        return 'green';
    }
  }
  
  return (
    <div className="task-preview wrapper">
      <div className="task-title">{props.title}</div>
      <div className="task-description muted wrapper-thin">{props.description}</div>
      <div className="task-assignee-status sm">
        <span className="task-assignee fl">{props.assignedTo.firstName} {props.assignedTo.lastName}</span>
        <span className={"task-status fr " + (this.statusClassHandler(props.status))}>{props.status}</span>
      </div>
    </div>
  );
}

export default TaskPreview;