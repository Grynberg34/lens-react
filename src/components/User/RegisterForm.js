import React from 'react'
import { Field, reduxForm } from 'redux-form'
import "../../scss/registerForm.scss";

let RegisterForm = props => {


  const { handleSubmit } = props


  return (
    <form className='registerForm' onSubmit={handleSubmit}>
      <div className='registerForm__field'>
        <label className='registerForm__field__label' htmlFor="name">name</label>
        <Field className='registerForm__field__input' name="name" component="input" type="text" />
      </div>
      <div className='registerForm__field'>
        <label className='registerForm__field__label' htmlFor="email">email</label>
        <Field className='registerForm__field__input' name="email" component="input" type="text" />
      </div>
      <div className='registerForm__field'>
        <label className='registerForm__field__label'  htmlFor="password">password</label>
        <Field className='registerForm__field__input' name="password" component="input" type="password" />
      </div>
      <div className='registerForm__field'>
        <label className='registerForm__field__label'  htmlFor="repeatpassword">repeat password</label>
        <Field className='registerForm__field__input' name="repeatpassword" component="input" type="password" />
      </div>
      <button className='registerForm__button' type="submit">register</button>
    </form>
  )
}

RegisterForm = reduxForm({
  form: 'RegisterForm'
})(RegisterForm)

export default RegisterForm

