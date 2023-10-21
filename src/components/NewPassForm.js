import React from 'react'
import { Field, reduxForm } from 'redux-form'

let NewFormForm = props => {


  const { handleSubmit } = props


  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="code">Código</label>
        <Field name="code" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="password">Senha</label>
        <Field name="password" component="input" type="password" />
      </div>
      <div>
        <label htmlFor="repeatpassword">Repetir Senha</label>
        <Field name="repeatpassword" component="input" type="password" />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

NewFormForm = reduxForm({
  form: 'NewFormForm'
})(NewFormForm)

export default NewFormForm
