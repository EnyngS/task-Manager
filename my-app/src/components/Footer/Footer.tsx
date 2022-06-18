import React from 'react';
import { useSelector } from 'react-redux';
import style from './Footer.module.scss';
import git from '../../common/img/git.png';

const Footer = () => {
  const dev = useSelector((store : any) => store.settings.developers);
  return (
    <footer>
      <div className={style.devBox}>
        <a href="https://rs.school/react/">
          <img src="https://rs.school/images/rs_school_js.svg" alt="rs_school_js" />
        </a>
        {dev.map((el:any) => {
          return (
            <div className={style.dev} key={el.id}>
              <span className={el.mentor ? style.active : ''}>
                {el.name} {el.mentor ? 'Mentor' : null}
              </span>
              <a href={el.url.git}>
                <img src={git} alt="developer" />
              </a>
            </div>
          );
        })}
      </div>
    </footer>
  );
};

export default Footer;
