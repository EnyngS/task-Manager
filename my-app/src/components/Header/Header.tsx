import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { GlobalContext } from '../../context/context';
// import { exit } from '../../store/authReduser';
import { actionLeng } from '../../store/settingsReduser';
import style from './Header.module.scss';
import MenuComponent from './MenuComponent/MenuComponent';



const Header = (props:any) => {
	const location = useLocation()
	const [ scroll ,setScroll] = useState('')
	const dispatch = useDispatch()
	const auth:boolean = useSelector((state:any)=> state.auth.user.isAuth)
	const en:any = useSelector((state:any) => state.settings.lang)
	const lang:any = useContext(GlobalContext)

	useEffect(()=>{
		document.addEventListener('scroll', scrollHendler)
		return ()=> {
			setScroll('')
			document.removeEventListener('scroll', scrollHendler)
		}
	},[])

	const scrollHendler = () => {
		(window.scrollY > 0)
		? (setScroll(`${style.scroll}`))
		: (setScroll(``))
	}
	const hendlerChenge = (e : any) => {
		let lang = e.target.value
		dispatch(actionLeng(lang))
	}



  return (
	<header className={scroll}>
		<div className={style.content}>

			<div className={style.boxBtn}>
				<select onChange = {(e)=>{ hendlerChenge(e) }}>
					<option value="ru">ru</option>
					<option value="en">en</option>
				</select>
				{
					auth?
						<>
						{(location.pathname === '/main'||location.pathname === '/task')
							?<></>
							:<Link className={style.welBtn} to={'/main'}>{lang[en].header.btn[2]}</Link>
						}
							<MenuComponent />
						</>
					:
						<>
							<Link className={style.welBtn} to={'/login'}>
								{lang[en].header.btn[0]}
							</Link>
							<Link className={style.welBtn} to={'/signup'}>
								{lang[en].header.btn[1]}
							</Link>
						</>
				}
			</div>

		</div>
	</header>
  );
};

export default Header;
