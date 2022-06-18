import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signin } from '../../store/authReduser';
import { errorRed } from '../../store/settingsReduser';
import LoginPage from './LoginPage/LoginPage';
const axios = require('axios').default;

const LoginPageContainer: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  interface IUser {
    isAuth: boolean;
    id: string;
    username: string;
    login: string;
    email: string;
    password: string;
    token: string;
  }
  let user: IUser;
  let setUser: any;

  [user, setUser] = useState({
    isAuth: false,
    id: '',
    username: '',
    login: '',
    email: '',
    password: '',
    token: '',
  });

  useEffect(() => {
    //   function move()
    let isMounted = true;
    if (user.isAuth && isMounted) {
      axios
        .post('https://quiet-bastion-49623.herokuapp.com/signin', {
          login: user.login,
          password: user.password,
        })
        .then((res: any) => {
          setUser({
            ...user,
            token: res.data.token,
          });
          axios
            .get(`https://quiet-bastion-49623.herokuapp.com/users`, {
              headers: {
                Authorization: `Bearer ${res.data.token}`,
              },
            })
            .then((res: any) => {
              let [userId] = res.data.filter((el: any) => el.login === user.login);
              let resultUser = {
                ...user,
                id: userId.id,
                username: userId.name,
                login: userId.login,
              };
              return (
                localStorage.setItem('rsApp', `${JSON.stringify(resultUser)}`),
                dispatch(signin(resultUser)),
                setUser({
                  isAuth: false,
                  id: '',
                  username: '',
                  login: '',
                  email: '',
                  password: '',
                  token: '',
                })
                //  navigate('/main')
              );
            })
            .then(() => setTimeout(() => navigate('/main'), 1000))
            .catch((error: any) => {
              dispatch(errorRed(error.message));
              navigate('/error');
            });
        })
        .catch((error: any) => {
          dispatch(errorRed(error.message));
          navigate('/error');
        });
    }
    //  ChatAPI.subscribeToFriendStatus(move);
    //  move()
    return () => {
      isMounted = false;
    };
  }, [user]);

  return <LoginPage addUser={setUser} />;
};

export default LoginPageContainer;
