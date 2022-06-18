import React, { useEffect } from 'react';
import style from './HomePage.module.scss';
import Boards from '../Boards/Boards';
import { useDispatch } from 'react-redux';
import { signin } from '../../store/authReduser';

const HomePage = () => {
	const dispatch = useDispatch()
	useEffect(()=>{
		if(localStorage.getItem('rsApp') !== null){
			let userSlorage:any = localStorage.getItem('rsApp')
			dispatch(signin(JSON.parse(userSlorage)))
		}
	},[])

  return (
    <div className={style.homePage}>
      <Boards />
    </div>
  );
};

export default HomePage;
