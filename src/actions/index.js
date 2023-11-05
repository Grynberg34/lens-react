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

export const CreateLens = (lens, list) => async dispatch => {

    var query = `/discover/${list.uri_content}?`

    var filter_description = []

    if (lens.country.iso !== null) {
        var query_country = `&with_origin_country=${lens.country.iso}`;
        query= query + query_country;
        filter_description.push(`country: ${lens.country.name}`)
    }

    if (lens.date.year !== null) {
        var query_date = `&primary_release_year=${lens.date.year}`;
        query= query + query_date;
        filter_description.push(`date: ${lens.date.year}`)
    }

    if (lens.date.decade !== null) {
        var start = lens.date.decade.substring(0,3)

        var query_date = `&primary_release_date.gte=${start + '0'}&primary_release_date.lte=${start+'9'}`;

        query= query + query_date;

        filter_description.push(`date: ${lens.date.decade}`)
    }

    if (lens.genres.length >0) {

        var genres = [];
        
        var genres_string = [];

        for (var i=0; i<lens.genres.length; i++) {
            genres.push(lens.genres[i].id)
            genres_string.push(lens.genres[i].name)
        }

        var query_genres = `&with_genres=${genres}`;

        query = query + query_genres;

        filter_description.push(`Genres: ${genres_string}`)
    }

    if (lens.castandcrew.length >0) {

        var castandcrew = [];

        var castandcrew_string = [];

        for (var i=0; i<lens.castandcrew.length; i++) {
            castandcrew.push(lens.castandcrew[i].id)
            castandcrew_string.push(lens.castandcrew[i].name)
        }

        var query_castandcrew = `&with_people=${castandcrew}`;

        query = query + query_castandcrew;

        filter_description.push(`Cast and crew: ${castandcrew_string}`)
    }

    if (lens.keywords.length >0) {

        var keywords = [];

        var keywords_string = [];

        for (var i=0; i<lens.keywords.length; i++) {
            keywords.push(lens.keywords[i].id)
            keywords_string.push(lens.keywords[i].name)
        }

        var query_keywords = `&with_keywords=${keywords}`;

        query = query + query_keywords;

        filter_description.push(`Keywords: ${keywords_string}`)
    }

    await movies.get(`${query}`, {
    }).then(function(response){
        var new_lens = {
            filters: lens,
            filter_description: filter_description,
            query: query,
            length: response.data.total_results
        };

        if (new_lens.length > 0)
        {
            dispatch({ type: 'SET_LENS', payload: new_lens});
            dispatch({ type: 'RESET_LENS', payload: {country: {name: null, iso: null}, castandcrew: [], genres: [], keywords: [], date: {decade:null, year: null}}});
            dispatch({ type: 'SHOW_FILTER', payload: null});
            dispatch({ type: 'SET_LENS_FAIL', payload: null});

        } else {
            dispatch({ type: 'SET_LENS_FAIL', payload: 'No results found'});
        }
    
    }).catch(function(err){
        console.log(err)
    })

};

export const RemoveLens = (index) => async dispatch => {
    dispatch({ type: 'REMOVE_LENS', payload: index.index});
};

export const AdvanceListCreation = () => async dispatch => {
    dispatch({ type: 'RESET_LENS', payload: {country: {name: null, iso: null}, castandcrew: [], genres: [], keywords: [], date: {decade:null, year: null}}});
    dispatch({ type: 'ADVANCE_LIST_CREATION', payload: true});
};

export const CreateSelectionList = (lenses) => async dispatch => {

    var list = []

    for (let i = 0; i < lenses.length; i++){
        var movies = await movies.get(`${lenses[i].query}`, {
        }).then(function(response){

        }).catch(function(err){
            console.log(err)
        })

        console.log(movies)
    }
 };

