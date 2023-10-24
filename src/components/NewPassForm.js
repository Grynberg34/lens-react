import React from 'react'
import { Field, reduxForm } from 'redux-form'
import "../scss/redefineForm.scss";

let NewPassForm = props => {


  const { handleSubmit } = props


  return (
    <form className="redefineForm" onSubmit={handleSubmit}>
      <div className="redefineForm__field">
        <label className="redefineForm__field__label" htmlFor="code">code</label>
        <Field className="redefineForm__field__input" name="code" component="input" type="text" />
      </div>
      <div className="redefineForm__field">
        <label className="redefineForm__field__label" htmlFor="password">password</label>
        <Field className="redefineForm__field__input" name="password" component="input" type="password" />
      </div>
      <div className="redefineForm__field">
        <label className="redefineForm__field__label" htmlFor="repeatpassword">repeat</label>
        <Field className="redefineForm__field__input" name="repeatpassword" component="input" type="password" />
      </div>
      <button className="redefineForm__button" type="submit">create new password</button>
    </form>
  )
}

NewPassForm = reduxForm({
  form: 'NewPassForm'
})(NewPassForm)

export default NewPassForm
