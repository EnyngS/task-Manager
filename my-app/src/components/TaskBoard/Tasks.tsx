import React, { useContext, useEffect, useState } from 'react';
import { useAppSelector } from '../../store/store';
import { useAppDispatch } from '../../store/store';
import { GlobalContext } from '../../context/context';
import { signin } from '../../store/authReduser';
import { getAllTask, deleteTask } from '../../store/taskReduser';
import style from './TaskBoard.module.scss';
import close from '../../common/img/close.png';
import ConfirmModal from '../confirmModal/confirmModal';

const Tasks = (props: any) => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((store) => store.task.tasks);
  const [UModal, setUModal] = useState(false);
  const [deleteT, setdeleteT] = useState('');
  const columns = useAppSelector((state: any) => state.task.columns);
  // ===================При изменении состояния универсальной модалки получает все колонки============================
  useEffect(() => {
    columns && dispatch(getAllTask(columns.filter((i: any) => i.order == 0)[0].id));
  }, [UModal]);
  // ---------------------Удаление таска------------------------------------------
  function setResponseYes(): void {
    console.log(deleteT, columns.filter((i: any) => i.order == 0)[0].id);
    dispatch(deleteTask({ Tid: deleteT, Cid: columns.filter((i: any) => i.order == 0)[0].id }));
    setUModal(false);
  }
  function setResponseNo(): void {
    setUModal(false);
  }

  const tasksAll =
    tasks &&
    tasks[0]?.title &&
    tasks.map((item: any): JSX.Element => {
      if (props.order == item.order) {
        return (
          <div key={item.id} className={style.element}>
            {/* ---Кнопка удалить--- */}
            <img
              onClick={(e) => {
                e.preventDefault();
                setUModal(true);
                setdeleteT(item.id!);
              }}
              className={style.close}
              width="30px"
              height="30px"
              src={close}
              alt="Close"
            />
            <h5>{item.title}</h5>
            <div>{item.description}</div>
          </div>
        );
      } else return <div key={item.id}></div>;
    });
  return (
    <div>
      {UModal ? <ConfirmModal setResponseYes={setResponseYes} setResponseNo={setResponseNo} /> : ''}
      {tasksAll}
    </div>
  );
};
export default Tasks;
