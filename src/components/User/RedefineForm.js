import React from 'react'
import { Field, reduxForm } from 'redux-form'
import "../../scss/redefineForm.scss";

let RedefineForm = props => {


  const { handleSubmit } = props


  return (
    <form className='redefineForm' onSubmit={handleSubmit}>
      <div className='redefineForm__field'>
        <label className='redefineForm__field__label' htmlFor="email">email</label>
        <Field className='redefineForm__field__input' name="email" component="input" type="text" required min="1" />
      </div>
      <button className='redefineForm__button' type="submit">submit</button>
    </form>
  )
}

RedefineForm = reduxForm({
  form: 'RedefineForm'
})(RedefineForm)

export default RedefineForm
