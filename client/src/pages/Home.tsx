import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/userContext';

import { api } from '../services/api';

interface Task {
  task: string
}

function Home(): JSX.Element {
  const { token: { token } } = useContext(UserContext);

  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchApi = async () => {
    try {
      const request = await api.get('api/tasks/userId', { headers: { Authorization: token } } );
      
      setTasks(request.data);
    } catch (_e) {
      console.log('Deu ruim!');
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <>
      <ul>
        {tasks && tasks.map((e, index) => <li key={index}>{e.task}</li>)}
      </ul>
    </>
  );
}

export default Home;