import React from 'react';

const TaskPreview = (props) => {
  return (
    <div className="task-preview wrapper">
      <div className="task-details muted">
      </div>
      <div className="task-title">{props.title}</div>
      <div className="task-description muted">{props.description}</div>
      <div className="task-assignee-status sm">
        <span className="task-assignee">{props.assignedTo.firstName} {props.assignedTo.lastName}</span>
        <span className="task-status">{props.status}</span>
      </div>
    </div>
  )
}

export default TaskPreview;