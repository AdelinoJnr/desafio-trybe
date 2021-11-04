import React, { useContext, useState } from 'react';
import { func, number, shape, string } from 'prop-types';
import { AiFillEdit } from 'react-icons/ai';
import { IoTrashBinSharp } from 'react-icons/io5';
import { api } from '../services/api';
import { UserContext } from '../context/userContext';

interface Props {
  task: {
    _id: string,
    task: string,
    userId: string,
  }
  length: number,
  setRenderPage: (string: number) => void
  renderPage: number
  setTasks: (param: []) => void,
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

function Task({ task, length, setRenderPage, renderPage, setTasks }: Props): JSX.Element {
  const { token: { token } } = useContext<DefaultContext>(UserContext);


  const [update, setUpdate] = useState(true);
  const { _id, task: tarefa } = task;
  
  const [newInput, setNewInput] = useState<string>(tarefa);

  const checkedNumber = length % 2 === 0 ? 'content-task content-pink' : 'content-task content-blue';
  const checkedNumberButton = length % 2 === 0
    ? 'content-btn-update content-pink'
    : 'content-btn-update content-blue';

  const deleteTask = async () => {
    try {
      await api.delete(`api/tasks/${_id}`);
      setRenderPage(renderPage + 1);
    } catch (_e) {
      console.log('Deu ruim!');  
    }
  };

  const updateTask = async (ev: React.MouseEvent) => {
    ev.preventDefault();
    try {
      await api.put(`api/tasks/${_id}`, { task: newInput });
      const { data } = await api.get('api/tasks/userId', { headers: { Authorization: token } } );
      setTasks(data);
      setRenderPage(renderPage + 1);
    } catch (_e) {
      console.log('Deu ruim!');
    }
    setUpdate(true);
  };

  return (
    <div className={ checkedNumber }>
      {
        update
          ? <p>{`${length + 1} - ${tarefa}`}</p>
          : <form className="content-update-form">
              <input
                className="input-update"
                type="text"
                value={newInput}
                onChange={ (ev) => setNewInput(ev.target.value) }
              />
              <button type="submit" onClick={updateTask}></button>
            </form> 
      }
      <div className={ checkedNumberButton } >
        <button onClick={ () => setUpdate(false) } type="button">
          <AiFillEdit className="icon-update" />
        </button>
        <button onClick={ deleteTask } type="button">
          <IoTrashBinSharp className="icon-delete" />
        </button>
      </div>
    </div>
  );
}

Task.propTypes = {
  task: shape({
    _id: string,
    task: string,
    userId: string,
  }).isRequired,
  length: number,
  setRenderPage: func,
  renderPage: number,
  setTasks: func
}; 

export default Task;