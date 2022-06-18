import React, { FC, useCallback, useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppSelector } from '../../store/store';
import { useAppDispatch } from '../../store/store';
import { getAllCell, deleteColumn } from '../../store/taskReduser';
import style from './TaskBoard.module.scss';
import { setModal } from '../../store/sliceBoards';
import ModalColumn from './ModalColumn/ModalColumn';
import ConfirmModal from '../confirmModal/confirmModal';
import close from '../../common/img/close.png';

import Tasks from './Tasks';
import ModalTask from './ModalTask/ModalTask';
import { createTask, setTaskModal, getAllTask, createCell } from '../../store/taskReduser';
import { GlobalContext } from '../../context/context';

const TaskBoard: FC = (props) => {
  const dispatch = useAppDispatch();
  const en:any = useSelector((state:any) => state.settings.lang)
  const lang:any = useContext(GlobalContext)

  //   const boardID = useSelector((state: any) => state.task.boardID);
  const columns = useSelector((state: any) => state.task.columns);
  const taskModal = useSelector((state: any) => state.task.taskModal);
  const isModal = useAppSelector((store) => store.boart.isModal);
  let BoardID: any = localStorage.getItem('BoardID');

  const [UModal, setUModal] = useState(false);
  const [deleteC, setdeleteC] = useState('');
  //   -----------------Удаление колонки после ответа от модалки(Подьем состояния из универсальной модалки)
  function setResponseYes(): void {
    dispatch(deleteColumn(deleteC));
    setUModal(false);
  }
  function setResponseNo(): void {
    setUModal(false);
  }
  // -----------Получаем всю инфу при монтировании и изменении статуса моалки----------------------------
  useEffect(() => {
    dispatch(createCell({ title: 'main', order: 0, boardID: BoardID }));
    dispatch(getAllCell());
    dispatch(getAllTask(columns?.filter((i: any) => i.order == 0)[0].id));
  }, []);
  useEffect(() => {
    dispatch(getAllCell());
    columns && dispatch(getAllTask(columns.filter((i: any) => i.order == 0)[0].id));
  }, [UModal]);
  // ------------------------------------
  const columnsAll =
    columns &&
    columns[0]?.title &&
    columns.map((item: any): JSX.Element => {
      if (!item.order) return <></>;
      return (
        <div key={item.id} className={style.cellWrapp}>
          {/* ---Кнопка удалить--- */}
          <img
            onClick={(e) => {
              e.preventDefault();
              setUModal(true);
              setdeleteC(item.id!);
            }}
            className={style.close}
            width="30px"
            height="30px"
            src={close}
            alt="Close"
          />
          <h4>{item.title}</h4>
          {/* ---------Таски для колонки--------- */}
          <Tasks key={item.id} order={item.order} />
        </div>
      );
    });

  return (
    <>
      <div className={style.wrap_btn}>
        {/* ------Создание колонки------- */}
        <button
          className={style.btn}
          onClick={() => {
            dispatch(getAllCell());
            dispatch(setModal(true));
          }}
        >
         {lang[en].taskPage.board.btnColumn}
        </button>
        {/* ------Создание таска если есть колонка------- */}
        {columns?.[0]?.title && columns.length > 1 && (
          <button
            className={style.btn}
            onClick={() => {
              dispatch(setTaskModal(true));
            }}
          >
             {lang[en].taskPage.board.btnTask}
          </button>
        )}
      </div>
      {/* ------Модалки колонки, таска и удаления колонки------- */}
      {isModal ? <ModalColumn /> : ''}
      {taskModal ? <ModalTask /> : ''}
      {UModal ? <ConfirmModal setResponseYes={setResponseYes} setResponseNo={setResponseNo} /> : ''}
      {/* ----------------------------------- */}
      <div className={style.taskWrapp}>
        <div className={style.tabelBoard}>{columnsAll}</div>
      </div>
    </>
  );
};

export default TaskBoard;
