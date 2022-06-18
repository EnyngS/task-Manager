import React, { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { GlobalContext } from '../../context/context';
import { signin } from '../../store/authReduser';
import style from './WelcomePage.module.scss';
import vlad from '../../common/img/vlad.jpg';
import fedya from '../../common/img/fedya.jpg'
const WelcomePage = () => {
  const en = useSelector((state: any) => state.settings.lang);
  const lang: any = useContext(GlobalContext);
  const promo1 = lang[en].welcomePage.promo1[0];
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('rsApp') !== null) {
      let userSlorage: any = localStorage.getItem('rsApp');
      dispatch(signin(JSON.parse(userSlorage)));
    }
  });

  return (
    <div className={style.welcomePage}>
      <div className={style.promo1}>
        <div>
          <h1>
            <b>{promo1.split(' ')[0][0]}</b>
            {promo1.split(' ')[0].slice(1)}&ensp;
            <b>{promo1.split(' ')[1][0]}</b>
            {promo1.split(' ')[1].slice(1)}&ensp;
            <b>{promo1.split(' ')[2][0]}</b>
            {promo1.split(' ')[2].slice(1)}
            <br />
            {lang[en].welcomePage.promo1[1]}
          </h1>
          <span>
            {lang[en].welcomePage.promo1[2].split(' ').slice(0, -2).join(' ')}&ensp;
            <b>{lang[en].welcomePage.promo1[2].split(' ').slice(-2).join(' ')}</b>
          </span>
        </div>
      </div>
      <div className={style.promo2}>
        <div>
          <h2>{lang[en].welcomePage.promo2[0]}</h2>
          <p>{lang[en].welcomePage.promo2[1]}</p>
        </div>
      </div>
		<div className={style.promo3}>
				<img src={vlad} alt="img" />
			<div>
				<h2>{lang[en].welcomePage.developers[1].name}</h2>
				<p>
					{lang[en].welcomePage.developers[1].description}
				</p>
			</div>
      </div>
		<div className={style.promo4}>
			<img src={fedya} alt="img" />
			<div>
				<h2>{lang[en].welcomePage.developers[0].name}</h2>
				<p>
				{lang[en].welcomePage.developers[0].description}
				</p>
			</div>
      </div>
		
    </div>
  );
};

export default WelcomePage;
