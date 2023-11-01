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

const showFiltersReducer = (filters = {genre: false, person: false, keyword: false, date: false, country: false}, action) => {
  switch(action.type){
    case 'SET_GENRE_FILTER':
      return {
        ...filters,
        genre: action.payload
      };
      case 'SET_PERSON_FILTER':
        return {
          ...filters,
          person: action.payload
        };
      case 'SET_KEYWORD_FILTER':
        return {
          ...filters,
          genre: action.payload
        };
      case 'SET_DATE_FILTER':
        return {
          ...filters,
          date: action.payload
        };
      case 'SET_COUNTRY_FILTER':
        return {
          ...filters,
          country: action.payload
        };
    default:
      return filters;
    

  }
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
  filters: showFiltersReducer,
  form: formReducer
  
});
