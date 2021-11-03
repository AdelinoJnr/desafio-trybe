import React, { useContext, useEffect, useState } from 'react';
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

  const fetchApi = async () => {
    try {
      const { data } = await api.get('api/tasks/userId', { headers: { Authorization: token } } );
      setTasks(data);
    } catch (_e) {
      console.log('Deu ruim!');
    }
  };

  const createTask = async (ev: any) => {
    ev.preventDefault();
    const userId = user._id;
    const payload = { task, userId };
    try {
      console.log(payload);
      await api.post('api/tasks', payload, { headers: { Authorization: token } });
      const { data } = await api.get('api/tasks/userId', { headers: { Authorization: token } } );
      setTasks(data);
      setTask('');
    } catch (_e) {
      console.log('Deu ruim!');
    }
    
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <>
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