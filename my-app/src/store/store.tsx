import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import settingsReduser from './settingsReduser';
import authReduser from './authReduser';

import sliceBoards from './sliceBoards';
import taskReduser from './taskReduser';

const roodReducer = combineReducers({
  settings: settingsReduser,
  auth: authReduser,
  boart: sliceBoards,
  task: taskReduser
});

const store = configureStore({ reducer: roodReducer });

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<any> = useSelector;
export default store;
