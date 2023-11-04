import api from '../api/api';
import movies from '../api/movies';
import filters from '../filters';

// REGISTER, LOGIN, REDEFINE, AUTH

export const LogInUser = (user) => async dispatch => {
    
    await api.post('/login', user).then(function(response){
        dispatch({ type: 'LOGIN_USER', payload: response.data.token });
    }).catch(function(err){
        console.log(err);
        dispatch({ type: 'FAIL_LOGIN', payload: err.response.data.message});
    })
    
};

export const RegisterUser = (user) => async dispatch => {
    
    await api.post('/register', user).then(function(response){
        dispatch({ type: 'REGISTER_USER', payload: true });
    }).catch(function(err){
        console.log(err);
        dispatch({ type: 'FAIL_REGISTER', payload: err.response.data});
    })
    
};

export const RedefinePassword = (email) => async dispatch => {
    
    await api.post('/redefine', email).then(function(){
        dispatch({ type: 'REDEFINE_PASSWORD', payload: true });
    }).catch(function(err){
        console.log(err);
        dispatch({ type: 'FAIL_REDEFINE', payload: err.response.data.message});
    })
    
};

export const DefineNewPassword = (newpass) => async dispatch => {
    
    await api.post('/redefine/newpass', newpass).then(function(response){
        dispatch({ type: 'DEFINE_PASSWORD', payload: true });
    }).catch(function(err){
        console.log(err)
        dispatch({ type: 'FAIL_PASSWORD', payload: err.response.data.message});
    })

};

export const CheckAuth = (token) => async dispatch => {

    await api.get('/user', {
        headers: {
          'Authorization': `Bearer ${token}` 
        }
    }).then(function(){
        var auth = true;
        dispatch({ type: 'CHECK_AUTH', payload: auth});

    })
    .catch(function(err){
        console.log(err)
    })

};

export const AuthGoogle = (googleUser) => async dispatch => {

    await api.post('/auth/google/signin', {
        name: googleUser.profileObj.name,
        googleID: googleUser.googleId
    }).then(function(response){
        dispatch({ type: 'LOGIN_USER', payload: response.data.token });
    }).catch(function(err){
        console.log(err)
    })

};

export const LogoutUser = () => async dispatch => {

    await dispatch({ type: 'LOGIN_USER', payload: null });
    await dispatch({ type: 'CHECK_AUTH', payload: false });

};


export const SetListType = (type) => async dispatch => {

    dispatch({ type: 'SET_TYPE', payload: type});
};

export const SetListContent = (uri, content) => async dispatch => {

    dispatch({ type: 'SET_CONTENT_URI', payload: uri});
    dispatch({ type: 'SET_CONTENT', payload: content});
};

export const ShowFilter = (filter) => async dispatch => {

    if (filter === 'country') {
        dispatch({ type: 'GET_COUNTRY', payload: filters.countries });
    } else if (filter === 'date') {
        dispatch({ type: 'GET_DATE', payload: filters.date });
    } else if (filter === 'genres') {
        dispatch({ type: 'GET_GENRES', payload: filters.genres });
    }

    dispatch({ type: 'SHOW_FILTER', payload: filter});
};

export const RemoveFilter = (filter) => async dispatch => {

    if (filter === 'country') {
        var country = {
            iso: null,
            name: null
        };
        dispatch({ type: 'SET_LENS_COUNTRY', payload: country });
    } else if (filter === 'date') {
        var date = {
            year: null,
            decade: null,
        };
        dispatch({ type: 'SET_LENS_DATE', payload: date});
    } else if (filter === 'genres') {
        dispatch({ type: 'REMOVE_LENS_GENRES', payload: [] });
    } else if (filter === 'cast and crew') {
        dispatch({ type: 'REMOVE_LENS_CAST_CREW', payload: [] });
    } else if (filter === 'keywords') {
        dispatch({ type: 'REMOVE_LENS_KEYWORDS', payload: [] });
    }
};

export const SetLensCountry = (iso,name) => async dispatch => {

    var country = {
        iso: iso,
        name: name, 
    };

    dispatch({ type: 'SET_LENS_COUNTRY', payload: country});
};

export const SetLensDate = (year_start, year_end) => async dispatch => {

    if (year_end === null) {
        var date = {
            year: year_start,
            decade: null,
        };
    } else {
        var date = {
            year: null,
            decade: year_start+'s',
        };
    }


    dispatch({ type: 'SET_LENS_DATE', payload: date});
};

export const SetLensGenres = (genre) => async dispatch => {

    dispatch({ type: 'SET_LENS_GENRES', payload: genre});
};

export const SetLensCastandCrew = (name) => async dispatch => {

    dispatch({ type: 'SET_LENS_CAST_CREW', payload: name});
};

export const SearchCastandCrew = (name) => async dispatch => {

    var query= name.replace(/ /g, '%20')

    await movies.get(`/search/person?query=${query}`, {
    }).then(function(response){
        dispatch({ type: 'SEARCH_CAST_CREW', payload: response.data });
    }).catch(function(err){
        console.log(err)
    })
};

export const SetLensKeywords = (name) => async dispatch => {

    dispatch({ type: 'SET_LENS_KEYWORDS', payload: name});
};

export const SearchKeywords = (word) => async dispatch => {

    var query= word.replace(/ /g, '%20')

    await movies.get(`/search/keyword?query=${query}`, {
    }).then(function(response){
        dispatch({ type: 'SEARCH_KEYWORDS', payload: response.data });
    }).catch(function(err){
        console.log(err)
    })
};

export const CreateLens = (lens) => async dispatch => {

    console.log(lens)

    var new_lens = {

    };

    dispatch({ type: 'SET_LENS', payload: new_lens});
};
