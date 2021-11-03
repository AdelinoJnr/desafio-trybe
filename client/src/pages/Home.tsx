import React, { useEffect, useState } from 'react';

import { api } from '../services/api';

function Home(): JSX.Element {
  const [tasks, setTasks] = useState([]);

  const fetchApi = async () => {
    try {
      const request = await api.get('api/tasks');
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
      {console.log(tasks)}
    </>
  );
}

export default Home;