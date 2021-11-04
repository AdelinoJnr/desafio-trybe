import React from 'react';
import { number, shape, string } from 'prop-types';
import { BiEdit } from 'react-icons/bi';
import { IoTrashBinSharp } from 'react-icons/io5';

interface Props {
  task: {
    _id: string,
    task: string,
    userId: string,
  }
  length: number
}

function Task({ task, length }: Props): JSX.Element {
  return (
    <div className="content-task">
      <p>{`${length + 1} - ${task.task}`}</p>
      <div className="content-btn-update">
        <button type="button">
          <BiEdit />
        </button>
        <button type="button">
          <IoTrashBinSharp />
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
}; 

export default Task;