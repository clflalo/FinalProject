import React from 'react';
import { useQuery } from '@apollo/client';

import ThoughtList from '../components/ThoughtList';
import ThoughtForm from '../components/ThoughtForm';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import { QUERY_THOUGHTS } from '../utils/queries';
import {QUERY_TASKS} from '../utils/queries';

function Home() { 
  const [date, setDate] = useState(new Date());
  const { loading, data } = useQuery(QUERY_THOUGHTS, QUERY_TASKS);
  const thoughts = data?.thoughts || [];
  const tasks = data?.tasks || [];


  return (
    <main>
      <div className="flex-row justify-center">
      <div className='app'>
      <h1 className='text-center'>Calendar</h1>
      <div className='calendar-container'>
        <Calendar onChange={setDate} value={date} />
      </div>
      <p className='text-center'>
        <span className='bold'>Selected Date:</span>{' '}
        {date.toDateString()}
      </p>
    </div>
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <ThoughtForm />
        </div>
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <TodoForm />
        </div>

        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList
              thoughts={thoughts}
              title="Here are your ToDo's and Notes"
            />
          )}
        </div>

        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <TodoList
            tasks={tasks}
              title="Here are your tasks..."
            />
          )}
        </div>
      </div>
    </main>
  );
};


export default Home;
