import React, { useContext, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { UserContext } from '../context/userContext';

import Task from '../components/Task';
import { api } from '../services/api';

interface ArrayTask {
  _id: string,
  task: string,
  userId: string,
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

  const [tasks, setTasks] = useState<ArrayTask[]>([]);
  const [task, setTask] = useState<string>('');
  const [renderPage, setRenderPage] = useState<number>(0);

  const getAllTasks = async () => {
    try {
      const { data } = await api.get('api/tasks/userId', { headers: { Authorization: token } } );
      setTasks(data);
    } catch (_e) {
      return;
    }
  };

  const createTask = async (ev: React.MouseEvent) => {
    ev.preventDefault();
    try {
      await api.post('api/tasks', { task }, { headers: { Authorization: token } });
      await getAllTasks();
      setTask('');
    } catch (_e) {
      return;
    }
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  useEffect(() => {
    getAllTasks();
  }, [renderPage]);

  const renderTask = () => {
    return (
      <section>
        {tasks && tasks.map((task, index) => (
          <Task
            key={task._id}
            renderPage={ renderPage }
            setRenderPage={setRenderPage}
            length={index}
            task={task}
            setTasks={setTasks}
          />
        ) )}
      </section>
    );
  };

  if (!token) return <Redirect to="/login" />;

  return (  
    <>
      <div className="header">
        <h2>{user && <p className="text-welcome">Seja bem vindo(a) <span className="name-user">{user.name}</span></p> }</h2>
        <Link className="exit-app" to="/login">Sair</Link>
      </div>
      <form className="form-content">
        <input
          type="text"
          name="task"
          value={task}
          onChange={(ev) => setTask(ev.target.value)}
          placeholder="Adicionar Tarefa"
          autoComplete="off"
        />
        <button className="btn" type="submit" onClick={createTask} >Adicionar</button>
      </form>
      <h2 className="title-pages">Tarefas</h2>
      { renderTask() }
    </>
  );
}

export default Home;