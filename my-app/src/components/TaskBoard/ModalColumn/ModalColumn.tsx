import React, { MouseEventHandler, ReactElement, useContext, useEffect } from 'react';
import style from './ModalColumn.module.scss';
import { useAppDispatch } from '../../../store/store';
import { GetAllBoards } from '../../../store/sliceBoards';
import { setModal } from '../../../store/sliceBoards';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import close from '../../../common/img/close.png';
import * as Yup from 'yup';
import { createCell, getAllCell } from '../../../store/taskReduser';
import { GlobalContext } from '../../../context/context';

const ModalColumn = () => {
	const en:any = useSelector((state:any) => state.settings.lang)
	const lang:any = useContext(GlobalContext)
  const dispatch = useAppDispatch();
  const columns = useSelector((state: any) => state.task.columns);

  let BoardID: any = localStorage.getItem('BoardID');
  useEffect(() => {
    return () => {
      dispatch(GetAllBoards());
      dispatch(getAllCell());
    };
  });
  const formik = useFormik({
    initialValues: {
      title: '',
      order: Math.max(...columns?.map((i: any) => i.order)) || 0,
    },
    validationSchema: Yup.object({
      title: Yup.string().max(35, 'Must be 35 characters or less').required('Required'),
    }),
    // --------------Создаём колонку-------------------------
    onSubmit: (values) => {
      dispatch(setModal(false));
      dispatch(createCell({ title: values.title, order: values.order + 1, boardID: BoardID }));
      dispatch(getAllCell());
      formik.resetForm();
      values = {
        title: '',
        order: Math.max(...columns?.map((i: any) => i.order)) || 0,
      };
    },
  });
  // ---------Закрываем модалку------------------------
  function ModalClose() {
    dispatch(setModal(false));
  }

  return (
    <div className={style.wrapper}>
      <form className={style.content} onSubmit={formik.handleSubmit}>
        <img
          onClick={ModalClose}
          className={style.close}
          width="30px"
          height="30px"
          src={close}
          alt="Close"
        />
        <label htmlFor="title">
		  {lang[en].taskPage.modalColumn.nameColumn}
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            id="title"
            type="text"
          />
        </label>
        <div className={style.error}>
          {formik.touched.title && formik.errors.title ? formik.errors.title : null}
        </div>

        <input type="submit" value={lang[en].taskPage.modalColumn.btnColumn} />
      </form>
    </div>
  );
};

export default ModalColumn;
