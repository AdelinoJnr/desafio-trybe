import React from 'react';
import { func, number, shape, string } from 'prop-types';
import { AiFillEdit } from 'react-icons/ai';
import { IoTrashBinSharp } from 'react-icons/io5';
import { api } from '../services/api';

interface Props {
  task: {
    _id: string,
    task: string,
    userId: string,
  }
  length: number,
  setRenderPage: (string: number) => void
  renderPage: number
}

function Task({ task, length, setRenderPage, renderPage }: Props): JSX.Element {
  const { _id, task: tarefa } = task;

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
  

  return (
    <div className={ checkedNumber }>
      <p>{`${length + 1} - ${tarefa}`}</p>
      <div className={ checkedNumberButton } >
        <button type="button">
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
  renderPage: number
}; 

export default Task;