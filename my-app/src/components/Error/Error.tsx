import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import style from './Error.module.scss'

const Error: FC = (props) => {
	const state = useSelector((state: any) => state.settings.error.message)
	const navigate = useNavigate()

	const goBack = (e:any) => {
		e.stopPropagation()
		navigate('/')
	}
	return(<div className={style.error} onClick = {(e)=> {goBack(e)}}>
			<h2>{state}</h2>
	</div>)
}

export default Error