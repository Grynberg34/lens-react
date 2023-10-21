import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import App from './components/App';
import Register from './components/Register';
import Login from './components/Login';
import Redefine from './components/Redefine';
import User from './components/User';
import {store, persistor} from './store.js';
import { PersistGate } from 'redux-persist/integration/react';
import 'bootstrap/dist/css/bootstrap.min.css';



ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}></Route>
          <Route path="register" element={<Register />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="redefine" element={<Redefine />}></Route>
          <Route path="user" element={<User />}></Route>
        </Routes>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.querySelector('#root')
);


