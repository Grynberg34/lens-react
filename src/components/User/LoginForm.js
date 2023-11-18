import React from 'react'
import { Field, reduxForm } from 'redux-form'
import "../../scss/loginForm.scss";

let LoginForm = props => {

  const { handleSubmit } = props


  return (
    <form className='loginForm' onSubmit={handleSubmit}>
      <div className='loginForm__field' >
        <label className='loginForm__field__label' htmlFor="email">email</label>
        <Field className='loginForm__field__input' name="email" component="input" type="text" />
      </div>
      <div className='loginForm__field'>
        <label className='loginForm__field__label' htmlFor="password">password</label>
        <Field className='loginForm__field__input' name="password" component="input" type="password" />
      </div>
      <button className='loginForm__button' type="submit">login</button>
    </form>
  )
}

LoginForm = reduxForm({
  form: 'LoginForm'
})(LoginForm)

export default LoginForm
