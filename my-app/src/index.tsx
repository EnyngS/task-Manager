import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import './index.css';
import App from './App';
import { GlobalContext } from './context/context';
import language from './context/language';

ReactDOM.render(
    <Provider store={store}>
		 <GlobalContext.Provider value={language}>
			 <BrowserRouter>
				<App />
			</BrowserRouter>
		 </GlobalContext.Provider>
    </Provider>,
  document.getElementById('root')
);