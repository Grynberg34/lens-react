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


// STUDIO 

export const SetListType = (type) => async dispatch => {

    dispatch({ type: 'SET_TYPE', payload: type});
};

export const SetListContent = (uri, content) => async dispatch => {

    dispatch({ type: 'SET_CONTENT_URI', payload: uri});
    dispatch({ type: 'SET_CONTENT', payload: content});
};

export const SetListTitle = (title) => async dispatch => {

    dispatch({ type: 'SET_TITLE', payload: title});

};

export const SetListDescription = (text) => async dispatch => {

    dispatch({ type: 'SET_DESCRIPTION', payload: text});

};

export const SetListItem = (item) => async dispatch => {

    dispatch({ type: 'SET_CONTENT_ITEM', payload: item});

};

export const ChangeItemPosition = (e, items) => async dispatch => {

    var item = items.splice(e.source.index, 1)[0];

    items.splice(e.destination.index, 0, item)

    var new_items = items;

    dispatch({ type: 'CHANGE_ITEM_POSITION', payload: new_items});

};

export const DeleteListItem = (index) => async dispatch => {

    dispatch({ type: 'DELETE_CONTENT_ITEM', payload: index});

};

export const ShowFilter = (filter) => async dispatch => {

    if (filter === 'country') {
        dispatch({ type: 'GET_COUNTRIES', payload: filters.countries });
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
        dispatch({ type: 'SET_LENS_DATE', payload: null});
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

export const SetLensDate = (year) => async dispatch => {

    dispatch({ type: 'SET_LENS_DATE', payload: year});
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

    dispatch({ type: 'RESET_LENS', payload: {country: {name: null, iso: null}, castandcrew: [], genres: [], keywords: [], date: null}});
    dispatch({ type: 'SHOW_FILTER', payload: null});

    var query = `/discover/${list.uri_content}?&sort_by=popularity.desc&with_release_type=1|2|3`

    var filter_description = [];

    if (lens.country.iso !== null) {
        var query_country = `&with_origin_country=${lens.country.iso}`;
        query= query + query_country;
        filter_description.push(`country: ${lens.country.name}`)
    }

    if (lens.date !== null) {

        if (typeof lens.date === 'number') {
            if (list.content === 'movies') {
                var query_date = `&primary_release_year=${lens.date}`;
                query= query + query_date;
                filter_description.push(`date: ${lens.date}`)
            } else if (list.content === 'series') {
                var query_date = `&first_air_date_year=${lens.date}`;
                query= query + query_date;
                filter_description.push(`date: ${lens.date}`)
            }

        } else {
            var start = lens.date.substring(0,3);

            if (list.content === 'movies') {
                var query_date = `&primary_release_date.gte=${start + '0'}&primary_release_date.lte=${start+'9'}`;
    
                query= query + query_date;
    
                filter_description.push(`date: ${lens.date}`)
            } else if (list.content === 'series') {
                var query_date = `&first_air_date.gte=${start + '0'}&first_air_date.lte=${start+'9'}`;
    
                query= query + query_date;
    
                filter_description.push(`date: ${lens.date}`)
            }
        }
    }

    if (lens.genres.length > 0) {

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

    if (lens.castandcrew.length > 0) {

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

    if (lens.keywords.length > 0) {

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
    dispatch({ type: 'RESET_LENS', payload: {country: {name: null, iso: null}, castandcrew: [], genres: [], keywords: [], date: []}});
    dispatch({ type: 'ADVANCE_LIST_CREATION', payload: true});
};

export const CreateSelectionList = (lenses) => async dispatch => {

    var list = [];

    for (let i = 0; i < lenses.length; i++){
        await movies.get(`${lenses[i].query}`, {
        }).then(async function(response){
            for (let j = 0; j < response.data.total_pages; j++) {
                await movies.get(`${lenses[i].query}&page=${j+1}`, {
                }).then(function(response){
                    list.push(response.data.results)

                    list = list.flat();

                    dispatch({ type: 'GET_SELECTION_LIST', payload: list});
                }).catch(function(err){
                    console.log(err)
                })
            }

        }).catch(function(err){
            console.log(err)
        })
    }

};

export const SortSelectionList = (filter, list) => async dispatch => {

    if (filter === 'A-Z') {
        var filtered_list = list.sort((a, b) => a.title > b.title ? 1 : -1);
        dispatch({ type: 'FILTER_SELECTION_LIST', payload: filtered_list});
    } else if (filter === 'Z-A') {
        var filtered_list = list.sort((a, b) => b.title > a.title ? 1 : -1);
        dispatch({ type: 'FILTER_SELECTION_LIST', payload: filtered_list});
    } else if (filter === '0-9') {
        var filtered_list = list.sort((a, b) => a.release_date > b.release_date ? 1 : -1);
        dispatch({ type: 'FILTER_SELECTION_LIST', payload: filtered_list});
    } else if (filter === '9-0') {
        var filtered_list = list.sort((a, b) => b.release_date > a.release_date ? 1 : -1);
        dispatch({ type: 'FILTER_SELECTION_LIST', payload: filtered_list});
    }

};

export const SearchSelectionList = (filter, list) => async dispatch => {

    filter.toLowerCase();

    var filtered_list = list.filter(value => value.title.toLowerCase().includes(filter))

    dispatch({ type: 'FILTER_SELECTION_LIST', payload: filtered_list});

};

export const SearchCountries = (filter, list) => async dispatch => {

    filter.toLowerCase();

    var filtered_list_countries = list.filter(value => value.english_name.toLowerCase().includes(filter))

    dispatch({ type: 'FILTER_COUNTRIES', payload: filtered_list_countries});

};

export const GetMovieInfo = (id, content) => async dispatch => {

    await movies.get(`/${content}/${id}`, {
    }).then(function(response){

        dispatch({ type: 'GET_MOVIE_INFO', payload: response.data});

    }).catch(function(err){
        console.log(err)
    })

    await movies.get(`/${content}/${id}/watch/providers`, {
    }).then(function(response){
        dispatch({ type: 'GET_MOVIE_PROVIDERS', payload: response.data});

    }).catch(function(err){
        console.log(err)
    })

    await movies.get(`/${content}/${id}/credits`, {
    }).then(function(response){

        dispatch({ type: 'GET_MOVIE_CREDITS', payload: response.data});

    }).catch(function(err){
        console.log(err)
    })

    await movies.get(`/${content}/${id}/keywords`, {
    }).then(function(response){

        dispatch({ type: 'GET_MOVIE_KEYWORDS', payload: response.data});

    }).catch(function(err){
        console.log(err)
    })

    await movies.get(`/${content}/${id}/images`, {
    }).then(function(response){
        dispatch({ type: 'GET_MOVIE_IMAGES', payload: response.data});

    }).catch(function(err){
        console.log(err)
    })




};

export const CreateList = (token, list, tiers) => async dispatch => {

    var content__ids = [];
    
    if (list.description !== null && list.description.length > 500) {
        
    } else if (list.title < 1 || list.title > 100) {
        
    } else {

        for (var i = 0; i < list.content_items.length; i++) {
            
            content__ids.push(list.content_items[i].id);

        }

        var new_list = {
            title: list.title,
            description: list.description,
            type: list.type,
            content: list.content,
            items: content__ids,
            tiers: tiers
        }
     
        await api.post('/user/create/list', new_list, {
            headers: {
              'Authorization': `Bearer ${token}` 
            }
        }).then(function(){

            dispatch({ type: 'CREATED_LIST', payload: true});
            dispatch({ type: 'RESET_LIST', payload: {title: null, description: null, type: null, content: null, content_items: [], uri_content: null, lenses: [] }});
            dispatch({ type: 'ADVANCE_LIST_CREATION', payload: false});
    
        })
        .catch(function(err){
            console.log(err)
        })
    
    }

};

export const CreateTier = () => async dispatch => {
        
    var tier = {
        title: 'tier'
    }

    dispatch({ type: 'CREATE_TIER', payload: tier});

};

export const ChangeTierPosition = (e, tiers) => async dispatch => {

    var tier = tiers.splice(e.source.index, 1)[0];

    tiers.splice(e.destination.index, 0, tier)

    var new_tiers = tiers;

    dispatch({ type: 'CHANGE_TIER_POSITION', payload: new_tiers});

};

export const SetTierTitle = (name, index) => async dispatch => {

    dispatch({ type: 'SET_TIER_TITLE', payload: name});

};

export const DeleteTier = (index) => async dispatch => {

    dispatch({ type: 'DELETE_TIER', payload: index});

};