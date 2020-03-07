import React, { Component } from "react";
import PropTypes from 'prop-types';

class Search extends Component{
  render(){
    return(
      <div className = 'container my-3'>
        <form className = 'form-inline'>
          <label>Поиск</label>
          <input className='form-control mx-2' type='search'
            onChange = {(e)=>this.props.searchFunc(e.target.value,this.props.columns)}/>
        </form>
      </div>
    );
  }
}

Search.propTypes = {
  searchFunc: PropTypes.func.isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Search;
