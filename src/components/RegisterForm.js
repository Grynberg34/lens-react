import React from 'react'
import { Field, reduxForm } from 'redux-form'

let RegisterForm = props => {


  const { handleSubmit } = props


  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <Field name="email" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <Field name="password" component="input" type="password" />
      </div>
      <div>
        <label htmlFor="repeatpassword">Repeat Password</label>
        <Field name="repeatpassword" component="input" type="password" />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

RegisterForm = reduxForm({
  form: 'RegisterForm'
})(RegisterForm)

export default RegisterForm

