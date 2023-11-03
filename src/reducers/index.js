import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';


//LOGIN

const userLogInReducer = (jwt = null, action) => {
  if (action.type === 'LOGIN_USER') {

    return action.payload;
    
  }
  
  return jwt;
};

const failedLogInReducer = (msg = '', action) => {
  if (action.type === 'FAIL_LOGIN') {

    return action.payload;
    
  }
  
  return msg;
};

//REGISTER

const userRegisterReducer = (user = false, action) => {
  if (action.type === 'REGISTER_USER') {

    return action.payload;
    
  }
  
  return user;
};

const failedRegisterReducer = (msg = '', action) => {
  if (action.type === 'FAIL_REGISTER') {

    return action.payload;
    
  }
  
  return msg;
};

//AUTH

const checkAuthReducer = (auth = false, action) => {
  if (action.type === 'CHECK_AUTH') {

    return action.payload;
  }
  
  return auth;
};

//CHECK USER

const checkUserReducer = (user = null, action) => {
  if (action.type === 'CHECK_USER') {

    return action.payload;
  }
  
  return user;
};

//REDEFINE PASSWORD

const userRedefineReducer = (email = false, action) => {
  if (action.type === 'REDEFINE_PASSWORD') {

    return action.payload;
    
  }
  
  return email;
};

const failedRedefineReducer = (msg = '', action) => {
  if (action.type === 'FAIL_REDEFINE') {

    return action.payload;
    
  }
  
  return msg;
};

const defineNewPasswordReducer = (newpass = false, action) => {
  if (action.type === 'DEFINE_PASSWORD') {

    return action.payload;
    
  }
  
  return newpass;
};

const failedNewPasswordReducer = (msg = '', action) => {
  if (action.type === 'FAIL_PASSWORD') {

    return action.payload;
    
  }
  
  return msg;
};

const createListReducer = (list = {title: null, type: null, content: null, uri_content: null, lens: null, query: null }, action) => {
  switch(action.type){
    case 'SET_TYPE':
      return {
        ...list,
        type: action.payload
      };
    case 'SET_CONTENT_URI':
      return {
        ...list,
        uri_content: action.payload
      };
    case 'SET_CONTENT':
      return {
        ...list,
        content: action.payload
      };
    default:
      return list;
    

  }
};

const createLensReducer = (lens = {country: {name: null, iso: null, query: null}, persons: {names: null, query: null}, genres: {names: null, query: null}, keywords: {words: null, query: null}, date: {decade:null, year: null, query: null}}, action) => {
  switch(action.type){
    case 'SET_LENS_COUNTRY':
      return {
        ...lens,
        country: action.payload
      };
    case 'SET_LENS_DATE':
      return {
        ...lens,
        date: action.payload
      };
    case 'SET_LENS_GENRE':
      return {
        ...lens,
        genres: lens.genres.push(action.payload)
      };
    case 'SET_LENS_PERSON':
      return {
        ...lens,
        persons: lens.persons.push(action.payload)
      };
    case 'SET_LENS_KEYWORD':
    return {
      ...lens,
      keywords: lens.keywords.push(action.payload)
    };
    
    default:
      return lens;
    

  }
};

const showFilterReducer = (filter = null, action) => {

  if (action.type === 'SHOW_FILTER') {

    return action.payload;
    
  }
  
  return filter;  

  
};

const getDateReducer = (date = null, action) => {

  if (action.type === 'GET_DATE') {

    return action.payload;
    
  }
  
  return date;  
  
};

const getGenresReducer = (genres = null, action) => {

  if (action.type === 'GET_GENRES') {

    return action.payload;
    
  }
  
  return genres;  
  
};

const getCountriesReducer = (countries = null, action) => {

  if (action.type === 'GET_COUNTRIES') {

    return action.payload;
    
  }
  
  return countries;  
  
};

export default combineReducers({

  jwt: userLogInReducer,
  auth: checkAuthReducer,
  fail: failedLogInReducer,
  user: checkUserReducer,
  register: userRegisterReducer,
  failRegister: failedRegisterReducer,
  redefine: userRedefineReducer,
  failRedefine: failedRedefineReducer,
  newpass: defineNewPasswordReducer,
  failNewpass: failedNewPasswordReducer,
  list: createListReducer,
  filter: showFilterReducer,
  countries: getCountriesReducer,
  date: getDateReducer,
  genres: getGenresReducer,
  lens: createLensReducer,
  form: formReducer
  
});
