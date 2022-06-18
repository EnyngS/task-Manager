import React from 'react';
import styles from './App.module.scss';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import AppRouter from './router/AppRouter'

const App = () => {
  return (
    <div className={styles.appWrapp}>
      <Header />
		<div className={styles.content}>
		<AppRouter />
		</div>
      <Footer />
    </div>
  );
};

export default App;
