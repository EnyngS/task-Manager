import React, { MouseEventHandler, ReactElement, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import style from './ModalBoard.module.scss';
import { useAppSelector } from '../../store/store';
import { useAppDispatch } from '../../store/store';
import { PostBoards, GetAllBoards, deleteBoard } from '../../store/sliceBoards';
import { BoardPrevType, setModal } from '../../store/sliceBoards';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import close from '../../common/img/close.png';
import * as Yup from 'yup';
import { GlobalContext } from '../../context/context';

const ModalBoards = () => {
	const en:any = useSelector((state:any) => state.settings.lang)
	const lang:any = useContext(GlobalContext)
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
      description: Yup.string().max(40, 'Must be 20 characters or less').required('Required'),
    }),

    onSubmit: (values) => {
      dispatch(PostBoards({ title: values.title, description: values.description }));
      dispatch(setModal(false));
      formik.resetForm();
      values = {
        title: '',
        description: '',
      };
    },
  });
  
  function ModalClose() {
    dispatch(setModal(false));
  }

  useEffect(() => {
    return () => {
      dispatch(GetAllBoards());
    };
  });

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
		  {lang[en].mainPage.modalBoard.name}
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
        <label htmlFor="description">
		  {lang[en].mainPage.modalBoard.description}
          <textarea
            cols={20}
            rows={3}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            id="description"
          />
        </label>
        <div className={style.error}>
          {formik.touched.description && formik.errors.description
            ? formik.errors.description
            : null}
        </div>

        <input type="submit" value={lang[en].mainPage.modalBoard.btn} />
      </form>
    </div>
  );
};

export default ModalBoards;
