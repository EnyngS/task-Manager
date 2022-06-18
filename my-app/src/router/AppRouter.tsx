import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { signin } from '../store/authReduser'
import { publicRoutes,privateRoutes } from './routs'

const AppRouter = () => {
	
	const dispatch = useDispatch()
	useEffect(()=>{
		if(localStorage.getItem('rsApp') !== null){
			let userSlorage:any = localStorage.getItem('rsApp')
			dispatch(signin(JSON.parse(userSlorage)))
		}
	})
	const isAuth : boolean = useSelector((state: any)=> state.auth.user.isAuth)

	return(<>
		<Routes>
			{
				(isAuth)
				? (privateRoutes.map(el => <Route key ={el.id} path = {el.path} element ={el.element} />))
				: (publicRoutes.map(el => <Route key={el.id} path = {el.path} element={el.element}/>))
			},
		</Routes>
	</>
	)
}

export default AppRouter