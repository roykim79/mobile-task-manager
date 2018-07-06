import React from 'react';

const TaskPreview = (props) => {
  return (
    <div
      // onClick={() => { onClick(task._id) }}
      className="task-preview wrapper">
      <div className="task-details text-muted">
      </div>
      <div className="task-title">{props.title}</div>
      <div className="task-description-preview">{props.description}</div>
      <div className="task-assignee-status text-muted sm">
        <span className="task-assignee">{props.assignee.firstName} {props.assignee.lastName}</span>
        <span className="task-status">{props.status}</span>
      </div>
    </div>
  )
}

export default TaskPreview;