import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_TASK } from '../../utils/mutations';
import { QUERY_TASKS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const TodoForm = () => {
  const [description, setDescription] = useState('');
  const [charCount, setCharCount] = useState(0);

  const [addTask, { error }] = useMutation(ADD_TASK, {
    update(cache, { data: { addTask } }) {
      try {
        const { tasks } = cache.readQuery({ query: QUERY_TASKS });

        cache.writeQuery({
          query: QUERY_TASKS,
          data: { tasks: [addTask, ...tasks] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, tasks: [...me.tasks, addTask] } },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addTask({
        variables: {
          description,
          createdBy: Auth.getProfile().data.username,
        },
        
      });
      
      setDescription('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(event)
    if (name === 'description' && value.length <= 280) {
      console.log("test")
      setDescription(value);
      setCharCount(value.length);
    }
  };

  return (
    <div>
      <h3>Todo's</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              charCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {charCount}/280
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
          
                 <textarea
                name="description"
                placeholder="Here's a new task..."
                value={description}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Task
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your tasks. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default TodoForm;