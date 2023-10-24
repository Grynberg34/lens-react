import api from '../api/api';

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

