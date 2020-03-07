import React, { Component } from "react";
import PropTypes from 'prop-types';

import validate from '../utils/validate.js';

class AddFormInput extends Component{
  inputChange(e,field,type){
    const val = type === 'number' ? parseInt(e.target.value) : e.target.value;
    let isValid = false;
    if(validate.validateFunc(validate.regExs[type],val)){
      isValid = true;
      this.props.addingUserChange(field,val);
    }
    this.props.validationChange(this.props.index,isValid);
  }
  render(){
    const col = this.props.col;
    const valid = this.props.valid ? 'is-valid' : 'is-invalid';
    return(
      <div>
        <label>{col.title}</label>
        <input className = {'form-control ' + valid}
          onChange = {(e) => this.inputChange(e,col.field,col.type)} />
        <div className="invalid-feedback">
          Введите корректное значение.
        </div>
      </div>
    );
  }
}

AddFormInput.propTypes = {
  index: PropTypes.number.isRequired,
  col: PropTypes.object.isRequired,
  valid: PropTypes.bool.isRequired,
  addingUserChange: PropTypes.func.isRequired,
  validationChange: PropTypes.func.isRequired
};

export default AddFormInput;
