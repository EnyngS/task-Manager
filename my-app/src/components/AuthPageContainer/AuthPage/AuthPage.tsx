import React, { FC, useContext } from 'react';
import style from './AuthPage.module.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { GlobalContext } from '../../../context/context';
import { useSelector } from 'react-redux';

type Iprops = {
	addUser: (param: object) => object
}

const AuthPage: FC <Iprops> = ({addUser}) => {
	const en = useSelector((state: any)=> state.settings.lang)
	const lang: any = useContext(GlobalContext)

	 const formik = useFormik({
		initialValues: {
			isAuth: false,
			username: '',
			login: '',
			email: '',
			password: '',
		},
		validationSchema: Yup.object({
			username: Yup.string()
			  .max(15, 'Must be 15 characters or less')
			  .required('Required'),
			login: Yup.string()
			  .max(15, 'Must be 15 characters or less')
			  .required('Required'),	
			email: Yup.string().email('Invalid email address').required('Required'),
			password: Yup.string()
			  .max(20, 'Must be 20 characters or less')
			  .required('Required'),
		 }),
		onSubmit: (values) => {
			values.isAuth = true
			addUser(values)
			formik.resetForm();
			values = {
				isAuth: false,
				username: '',
				login: '',
				email: '',
				password: '',
			}
		},
	 });
  return (
    <div className={style.AuthPageWrapp}>
		 <div className={style.formWrapp}>
			 <div className={style.leftSide}>
				 <h4>{lang[en].LoginAuthPage.btn[1]}</h4>
				 <div className={`${style.circle}`}></div>
				 <div className={`${style.circle} ${style.c2}`}></div>
				 <div className={`${style.circle} ${style.c3}`}></div>
				 <div className={`${style.circle} ${style.c4}`}></div>
				 <div className={`${style.circle} ${style.c5}`}></div>
			 </div>
			 <div className={style.rightSide}>
					<form onSubmit={ formik.handleSubmit }>
						<label htmlFor="username">username
						<input 
							id="username" 
							name="username" 
							placeholder="username" 
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.username}
							style = {{borderBottom : (formik.touched.username && formik.errors.username ? '2px solid red':'')}}
						/>
						<div className={style.error}>
							{formik.touched.username && formik.errors.username 
								?formik.errors.username 
								: null
							}
						</div>
						</label>
						<label htmlFor="login">login
						<input 
							id="login" 
							name="login" 
							placeholder="login" 
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.login}
							style = {{borderBottom : (formik.touched.login && formik.errors.login ? '2px solid red':'')}}
						/>
						<div className={style.error}>
							{formik.touched.login && formik.errors.login 
								?formik.errors.login 
								: null
							}
						</div>
						</label>
						<label htmlFor="email">email
						<input 
							id="email" 
							name="email" 
							placeholder="email" 
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.email}
							style = {{borderBottom : (formik.touched.email && formik.errors.email ? '2px solid red':'')}}
						/>
						<div className={style.error}>
							{formik.touched.email && formik.errors.email 
								?formik.errors.email 
								: null
							}
						</div>
						</label>
						<label htmlFor="password">password
						<input 
							id="password" 
							name="password" 
							placeholder="password" 
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.password}
							style = {{borderBottom : (formik.touched.password && formik.errors.password ? '2px solid red':'')}}
						/>
						<div className={style.error}>
							{formik.touched.password && formik.errors.password 
								?formik.errors.password 
								: null
							}
						</div>
						</label>
						<button type="submit">{lang[en].LoginAuthPage.btn[1]}</button>
					</form>
			 </div>
		 </div>
      {/* <Link to={'/HomePage'}>Прошла успешна!</Link> */}
    </div>
  );
};

export default AuthPage;