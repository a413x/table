import React, { Component } from "react";
import PropTypes from 'prop-types';

import AddFormInput from './AddFormInput.js';

class AddForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      showForm : false,
      inputsValid: Array(this.props.columns.length).fill(false)
    }
    this.addingUser={};
    this.addingUserChange = this.addingUserChange.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.addUser = this.addUser.bind(this);
    this.validationChange = this.validationChange.bind(this);
  }
  toggleForm(){
    this.setState({
      showForm: !this.state.showForm,
      inputsValid: [...this.state.inputsValid].fill(false)
    });
    this.addingUser = {};
  }
  addingUserChange(field,val){
    this.addingUser[field] = val;
  }
  addUser(){
    this.props.addUser({...this.addingUser});
  }
  validationChange(ind,val){
    const newInputsValid = [...this.state.inputsValid];
    newInputsValid[ind] = val;
    this.setState({
      inputsValid: newInputsValid
    })
  }
  render(){
    const columns = this.props.columns;
    const allValid = this.state.inputsValid.reduce((acc,val)=> acc && val);
    return(
      <div>
        <button className = 'btn btn-info'
          onClick = {this.toggleForm}>
          Добавить
        </button>
        {this.state.showForm &&
          <div>
            <form>
              {columns.map((col,ind)=>
                <AddFormInput key={ind} index = {ind} col={col}
                  valid = {this.state.inputsValid[ind]}
                  addingUserChange={this.addingUserChange}
                  validationChange = {this.validationChange}/>
              )}
            </form>
            <button className = 'btn btn-success my-3' onClick = {this.addUser}
              disabled = {allValid ? null : true}>
              Добавить в таблицу
            </button>
          </div>
        }
      </div>
    );
  }
}

AddForm.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  addUser: PropTypes.func.isRequired
};

export default AddForm;
