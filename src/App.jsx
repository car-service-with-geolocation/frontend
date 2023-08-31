import React from 'react';

import style from './App.module.css';
import Header from './Header';

function app() {
  return (
    <div className={style.app}>
      <h1>Hello App</h1>
      <Header title="Hello App Header" style={{ color: 'gray' }}>
        <p>Hello App Header children</p>
      </Header>
    </div>
  );
}

export default app;
