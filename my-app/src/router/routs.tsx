import AuthPageContainer from '../components/AuthPageContainer/AuthPageContainer';
import Error from '../components/Error/Error';
import HomePage from '../components/HomePage/HomePage';
import LoginPageContainer from '../components/LoginPageContainer/LoginPageContainer';
import TaskBoard from '../components/TaskBoard/TaskBoard';
import WelcomePage from '../components/WelcomPage/WelcomePage';

type routesItem = {
  id: number;
  path: string;
  element: any;
};
type IpublicRoutes = [routesItem, routesItem, routesItem, routesItem];
type IprivateRoutes = [routesItem, routesItem, routesItem, routesItem,routesItem ,routesItem];

export const publicRoutes: IpublicRoutes = [
  { id: 1, path: '/', element: <WelcomePage /> },
  { id: 2, path: '/signup', element: <AuthPageContainer /> },
  { id: 3, path: '/login', element: <LoginPageContainer /> },
  { id: 4, path: '*', element: <Error /> },
];

export const privateRoutes: IprivateRoutes = [
  { id: 1, path: '/', element: <WelcomePage /> },
  { id: 2, path: '/signup', element: <AuthPageContainer /> },
  { id: 3, path: '/login', element: <LoginPageContainer /> },
  { id: 4, path: '/main', element: <HomePage /> },
  { id: 5, path: '*', element: <Error /> },
  { id: 5, path: '/task', element: <TaskBoard /> },
];
