import React, { Component } from "react";
import PropTypes from 'prop-types';

import './styles/selectedUser.css';

class SelectedUser extends Component{
  render(){
    const user = this.props.user;
    const name = user.firstName + ' ' + user.lastName;
    const description = user.description;
    const address = user.address;
    return(
      <div className = 'card my-3 selectedUser'>
        <div className = 'card-body'>
          <p>Выбран пользователь: <b>{name}</b></p>
          {description && <p className = 'd-flex'>
            <span className='mr-3'>Описание:</span>
            <textarea value = {description} className = 'form-control' readOnly>
            </textarea>
          </p>}

          {address && <div>
            <p>Адрес: <b>{address.streetAddress}</b></p>
            <p>Город: <b>{address.city}</b></p>
            <p>Провинция/штат: <b>{address.state}</b></p>
            <p>Индекс: <b>{address.zip}</b></p>
          </div>}

          <button type="button" className="close" aria-label="Close"
            onClick = {this.props.unselectRow}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>
    );
  }
}

SelectedUser.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string
  }).isRequired,
  unselectRow: PropTypes.func.isRequired
};

export default SelectedUser;
