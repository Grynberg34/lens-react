import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import App from './components/App';
import Register from './components/User/Register';
import Login from './components/User/Login';
import Redefine from './components/User/Redefine';
import Studio from './components/Studio/Studio';
import Home from './components/Home';
import StudioList from './components/Studio/List/StudioList';
import Watchlist from './components/Watchlist/Watchlist';
import Tierlist from './components/Tierlist/Tierlist';
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
          <Route path="home" element={<Home />}></Route>
          <Route path="studio" element={<Studio />}></Route>
          <Route path="studio/list" element={<StudioList />}></Route>
          <Route path="profile/:user/watch/:id" element={<Watchlist />}></Route>
          <Route path="profile/:user/tier/:id" element={<Tierlist />}></Route>
        </Routes>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.querySelector('#root')
);


