import React, { useContext, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { UserContext } from '../context/userContext';

import { api } from '../services/api';

interface Task {
  task: string
}

interface DefaultContext {
  token: {
    token: string
  },
  setToken: (token: string) => void,
  user: {
    _id: string,
    name: string,
    email: string,
  }
}

function Home(): JSX.Element {
  const { token: { token }, user } = useContext<DefaultContext>(UserContext);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState<string>('');

  const getAllTasks = async () => {
    try {
      const { data } = await api.get('api/tasks/userId', { headers: { Authorization: token } } );
      setTasks(data);
    } catch (_e) {
      console.log('Deu ruim!');
    }
  };

  const createTask = async (ev: any) => {
    ev.preventDefault();
    try {
      await api.post('api/tasks', { task }, { headers: { Authorization: token } });
      await getAllTasks();
      setTask('');
    } catch (_e) {
      console.log('Deu ruim!');
    }
  };

  useEffect(() => {
    getAllTasks();
  }, []);


  if (!token) return <Redirect to="/login" />;

  return (  
    <>
      <h2>{user && user.name}</h2>
      <Link to="/login">Sair</Link>
      <form>
        <input
          type="text"
          name="task"
          value={task}
          onChange={(ev) => setTask(ev.target.value)}
          placeholder="Adicionar Tarefa"
        />
        <button type="submit" onClick={createTask} >Adicionar</button>
      </form>
      <ul>
        {tasks && tasks.map((e, index) => <li key={index}>{e.task}</li>)}
      </ul>
    </>
  );
}

export default Home;