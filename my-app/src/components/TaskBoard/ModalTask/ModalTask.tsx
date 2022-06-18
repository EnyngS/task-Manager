import React, { MouseEventHandler, ReactElement, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import style from './ModalTask.module.scss';
import { useAppSelector } from '../../../store/store';
import { useAppDispatch } from '../../../store/store';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import close from '../../../common/img/close.png';
import * as Yup from 'yup';
import { createTask, setTaskModal, getAllTask } from '../../../store/taskReduser';
import { GlobalContext } from '../../../context/context';

const ModalTask = () => {
  const dispatch = useAppDispatch();
  const en:any = useSelector((state:any) => state.settings.lang)
	const lang:any = useContext(GlobalContext)

  const tasks = useSelector((state: any) => state.task.tasks);
  const columns = useSelector((state: any) => state.task.columns);
  let select =
    columns &&
    columns[0]?.title &&
    columns.map((item: any): JSX.Element => {
      if (!item.order) return <></>;
      return <option value={+item.order}>{item.title}</option>;
    });

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      order: tasks?.length || 1,
      select: columns.filter((i: any) => i.order != 0)[0].order,
    },

    validationSchema: Yup.object({
      title: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
      description: Yup.string().max(40, 'Must be 20 characters or less').required('Required'),
    }),

    onSubmit: (values) => {
      dispatch(
        createTask({
          title: values.title,
          order: +values.select,
          description: values.description,
          columnId: columns.filter((i: any) => i.order == 0)[0].id,
        })
      );
      dispatch(setTaskModal(false));
      formik.resetForm();
      values = {
        title: '',
        description: '',
        order: tasks?.length || 1,
        select: columns[0].title,
      };
    },
  });

  function ModalClose() {
    dispatch(setTaskModal(false));
  }

  useEffect(() => {
    return () => {
      dispatch(getAllTask(columns.filter((i: any) => i.order == 0)[0].id));
    };
  });

  return (
    <div className={style.wrapper}>
      <form className={style.content} onSubmit={formik.handleSubmit}>
        {/* ---Кнопка закрыть--- */}
        <img
          onClick={ModalClose}
          className={style.close}
          width="30px"
          height="30px"
          src={close}
          alt="Close"
        />
        <label htmlFor="title">
          {lang[en].taskPage.modalTask.nameTask}
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
		  {lang[en].taskPage.modalTask.descriptionTask}
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
        {/* -------------ВЫбор колонки для таска------------------ */}
        <label htmlFor="select">{lang[en].taskPage.modalTask.selectColumn}</label>
        <select
          id="select"
          className={style.select}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.select}
        >
          {select}
        </select>

        <input type="submit" value={lang[en].taskPage.modalTask.btnTask}/>
      </form>
    </div>
  );
};

export default ModalTask;
