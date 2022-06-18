import React, { useContext, useEffect } from 'react';
import style from './confirmModal.module.scss';
import { useAppSelector } from '../../store/store';
import { useAppDispatch } from '../../store/store';
import { GetAllBoards, deleteBoard } from '../../store/sliceBoards';
import { getAllCell, deleteColumn, getAllTask } from '../../store/taskReduser';
import { GlobalContext } from '../../context/context';
import { useSelector } from 'react-redux';





const ConfirmModal = (props: any) => {
	const en:any = useSelector((state:any) => state.settings.lang)
	const lang:any = useContext(GlobalContext)
  const dispatch = useAppDispatch();
  let BoardID: any = localStorage.getItem('BoardID');
  const columns = useAppSelector((state: any) => state.task.columns);
  //   -----------Обновляем все стейты при закрытии модалки------------------------
  useEffect(() => {
    return () => {
      dispatch(GetAllBoards());
      dispatch(getAllCell());
      columns && dispatch(getAllTask(columns?.filter((i: any) => i.order == 0)[0].id));
    };
  });

  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <div className={style.quest}>{lang[en].confirmModal[0]}</div>
        <div className={style.answer}>
          <div onClick={props.setResponseYes} className={style.yes}>
			 {lang[en].confirmModal[1]}
          </div>
          <div onClick={props.setResponseNo} className={style.no}>
			 {lang[en].confirmModal[2]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
