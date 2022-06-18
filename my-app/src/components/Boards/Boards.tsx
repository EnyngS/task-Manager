import React, { MouseEventHandler, ReactElement, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import style from './Boards.module.scss';
import { useAppSelector } from '../../store/store';
import { useAppDispatch } from '../../store/store';
import { PostBoards, GetAllBoards, deleteBoard } from '../../store/sliceBoards';
import { BoardPrevType, setModal, setDeleteItem, setconfirmModal } from '../../store/sliceBoards';
import { useSelector } from 'react-redux';
import ModalBoards from './ModalBoard';
import close from '../../common/img/close.png';
import ConfirmModal from '../confirmModal/confirmModal';
import { setBoardID } from '../../store/taskReduser';
import { GlobalContext } from '../../context/context';

const Boards = () => {
  const en: any = useSelector((state: any) => state.settings.lang);
  const lang: any = useContext(GlobalContext);
  const dispatch = useAppDispatch();
  const isModal = useAppSelector((store) => store.boart.isModal);
  const boards = useAppSelector((store) => store.boart.boards);

  const [UModal, setUModal] = useState(false);
  const [deleteB, setdeleteB] = useState('');
  useEffect(() => {
    dispatch(GetAllBoards());
  }, []);
  useEffect(() => {
    dispatch(GetAllBoards());
  }, [UModal]);
  //   -----------------Удаление борда после ответа от модалки
//   function setResponseYes(): void {
//     dispatch(deleteBoard(deleteB));
//     setUModal(false);
//   }
//   function setResponseNo(): void {
//     setUModal(false);
//   }
  // ------------------------------------
  const cards =
    boards &&
    boards[0]?.title &&
    boards.map((item: BoardPrevType): JSX.Element => {
      return (
        <>
          <Link
            className={style.boards__item}
            key={item.id}
            to="/task"
            onClick={() => {
              item.id && localStorage.setItem('BoardID', item.id);
              dispatch(setBoardID(item.id));
            }}
          >
            {/* ---Кнопка удалить--- */}
            {/* <img
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setUModal(true);
                item.id && setdeleteB(item.id);
              }}
              className={style.close}
              width="30px"
              height="30px"
              src={close}
              alt="Close"
            /> */}
            {/* ------------- */}
            <div className={style.boards__title}>{item.title}</div>
            <div className={style.boards__desc}>{item.description}</div>
          </Link>
        </>
      );
    });
  return (
    <div className={style.wrapper}>
      {/* ------Создание борда------- */}
      {isModal ? <ModalBoards /> : ''}
      {/* ------Удаление борда------- */}
      {/* {UModal ? <ConfirmModal setResponseYes={setResponseYes} setResponseNo={setResponseNo} /> : ''} */}

      <button className={style.btn} onClick={() => dispatch(setModal(true))}>
        {lang[en].header.btn[4]}
      </button>
      <div className={style.boards}>{cards}</div>
    </div>
  );
};

export default Boards;
