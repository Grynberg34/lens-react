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

//CREATE LENS

const createListReducer = (list = {title: null, type: null, content: null, uri_content: null, lenses: [] }, action) => {
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
    case 'SET_LENS':
      return {
        ...list,
        lenses: [...list.lenses, action.payload]
      };
    case 'REMOVE_LENS':
      return {
        ...list,
        lenses: list.lenses.filter((_, index) => index !== action.payload)
      };
  
    default:
      return list;
    

  }
};

const createLensReducer = (lens = {country: {name: null, iso: null}, castandcrew: [], genres: [], keywords: [], date: null}, action) => {
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
    case 'SET_LENS_GENRES':
      return {
        ...lens,
        genres: [...lens.genres, action.payload]
      };
    case 'REMOVE_LENS_GENRES':
      return {
        ...lens,
        genres: action.payload
      };
    case 'SET_LENS_CAST_CREW':
      return {
        ...lens,
        castandcrew: [...lens.castandcrew, action.payload]
      };
    case 'REMOVE_LENS_CAST_CREW':
    return {
      ...lens,
      castandcrew: action.payload
    };
    case 'SET_LENS_KEYWORDS':
    return {
      ...lens,
      keywords: [...lens.keywords, action.payload]
    };
    case 'REMOVE_LENS_KEYWORDS':
      return {
        ...lens,
        keywords: action.payload
      };
    case 'RESET_LENS':
      return {
        ...lens = action.payload
      };
    default:
      return lens;
    

  }
};

const showLensFailReducer = (lens_fail = null, action) => {

  if (action.type === 'SET_LENS_FAIL') {

    return action.payload;
    
  }
  
  return lens_fail;  
  
};

const showFilterReducer = (filter = null, action) => {

  if (action.type === 'SHOW_FILTER') {

    return action.payload;
    
  }
  
  return filter;  
  
};

const searchCastandCrewReducer = (castandcrew = null, action) => {

  if (action.type === 'SEARCH_CAST_CREW') {

    return action.payload;
    
  }
  
  return castandcrew;  

};

const searchKeywordsReducer = (keywords = null, action) => {

  if (action.type === 'SEARCH_KEYWORDS') {

    return action.payload;
    
  }
  
  return keywords;  

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

  switch(action.type){
    case 'GET_COUNTRIES':
      return {
        ...countries,
        all: action.payload,
        filter: action.payload
      };
    case 'FILTER_COUNTRIES':
      return {
        ...countries,
        filter: action.payload
      };
    default:
      return countries;
    }
  
};

const advanceListCreationReducer = (next = false, action) => {

  if (action.type === 'ADVANCE_LIST_CREATION') {

    return action.payload;
    
  }
  
  return next;  
  
};

const getSelectionListReducer = (selection_list = null, action) => {

  switch(action.type){
    case 'GET_SELECTION_LIST':
      return {
        ...selection_list,
        all: action.payload,
        filter: action.payload
      };
    case 'FILTER_SELECTION_LIST':
      return {
        ...selection_list,
        filter: action.payload
      };
    default:
      return selection_list;
    }
  
};

const getMovieReducer = (movie = null, action) => {

  switch(action.type){
    case 'GET_MOVIE_INFO':
      return {
        ...movie,
        info: action.payload
      };
    case 'GET_MOVIE_CREDITS':
      return {
        ...movie,
        credits: action.payload
      };
    case 'GET_MOVIE_KEYWORDS':
      return {
        ...movie,
        keywords: action.payload
      };
    case 'GET_MOVIE_PROVIDERS':
      return {
        ...movie,
        providers: action.payload
      };
    default:
      return movie;
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
  filter: showFilterReducer,
  countries: getCountriesReducer,
  date: getDateReducer,
  genres: getGenresReducer,
  castandcrew: searchCastandCrewReducer,
  keywords: searchKeywordsReducer,
  lens: createLensReducer,
  lens_fail: showLensFailReducer,
  next: advanceListCreationReducer,
  selection_list: getSelectionListReducer,
  movie: getMovieReducer,
  form: formReducer
  
});
