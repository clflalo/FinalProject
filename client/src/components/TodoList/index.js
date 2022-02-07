import React from 'react';
import { Link } from 'react-router-dom';

const TodoList = ({
  tasks,
  description,
  showDescription = true,
  showUsername = true,
}) => {
  if (!tasks.length) {
    return <h3>No Tasks</h3>;
  }

  return (
    <div>
      {showDescription && <h3>{description}</h3>}
      {tasks &&
        tasks.map((task) => (
          <div key={task._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showUsername ? (
                <Link
                  className="text-light"
                  to={`/profiles/${task.taskdescription}`}
                >
                  {task.taskdescription} <br />
                  <span style={{ fontSize: '1rem' }}>
                    had this task on {task.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    You had this task on {task.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{task.taskdescription}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/thoughts/${task._id}`}
            >
              Join the discussion on this thought.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default TodoList;